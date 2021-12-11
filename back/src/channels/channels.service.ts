import { UnauthorizedException, Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chatchannel } from 'src/entities/Chatchannel';
import { Chatcontent } from 'src/entities/Chatcontent';
import { Chatmember } from 'src/entities/Chatmember';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { NotFoundError, timeout } from 'rxjs';
import { EventsGateway } from 'src/events/events.gateway';
import { name } from 'ormconfig';
import { Blockmember } from 'src/entities/Blockmember';
@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Chatchannel) private chatchannelRepository: Repository<Chatchannel>,
    @InjectRepository(Chatmember) private chatmemberRepository: Repository<Chatmember>,
    @InjectRepository(Chatcontent) private chatcontentRepository: Repository<Chatcontent>,
    @InjectRepository(Blockmember) private blockmemberRepository:Repository<Blockmember>,
    private eventsGateway:EventsGateway,
  ) { }

  private salt:number;

  // private 제외
  async allChannelList() {
    //const ret = await this.chatchannelRepository.find({select : ["id", "name", "type", "createdAt", "deleteAt", "updatedAt"]});
    const ret = await this.chatchannelRepository.find({select:["id", "name", "type", "authId", "createdAt", "updatedAt", "deleteAt"], order:{
      createdAt:"DESC",
    }});
    return ret;
  }
  
  
  async myChannelList(userid:string) {
    const ret = await this.chatchannelRepository.createQueryBuilder('c')
    .leftJoin('c.Chatmembers', 'm')
    .where('m.userId = :userid', {userid})
    .select (["c.id", "c.name", "c.authId", "c.type", "c.createdAt", "c.deleteAt", "c.updatedAt"])
    .orderBy("c.updatedAt", "DESC")
    .getMany();
    return ret;
  }

  async myChannelListOnlyId(userid:string) {
    const arr = await this.chatchannelRepository.createQueryBuilder('c')
    .leftJoin('c.Chatmembers', 'm')
    .where('m.userId = :userid', {userid})
    .select (["c.id"])
    .orderBy("c.updatedAt", "DESC")
    .getMany();
    let ret = new Array();
    let size = arr.length;
    while (size--){
      ret[size] = arr[size].id; 
    }
    return ret;
  }

  async makeChannel(userId:string, channelName:string, channelType:number, password:string) {
    //const obj:Chatchannel = {};

    if (channelType !== 0 && channelType !== 1 && channelType !== 2)
      throw new BadRequestException("채팅방 타입은 0,1,2만 올수있음");
    if (await this.chatchannelRepository.findOne({name:channelName, type:channelType}))
      throw new BadRequestException("이미 있는 채팅방입니다");
    const newChannel = new Chatchannel();
    newChannel.name = channelName;
    newChannel.type = channelType;
    newChannel.authId = userId;
    if (channelType == 1){
      if (!password)
        throw new BadRequestException("protected방에는 비밀번호가 있어야 합니다")
      const newPassword = await bcrypt.hash(password, 12);
      newChannel.password = newPassword;
    }
    const channel = await this.chatchannelRepository.save(newChannel);
    const newMember = new Chatmember();
    newMember.userId = userId;
    newMember.channelId = channel.id;
    newMember.auth = 2;
    await this.chatmemberRepository.save(newMember);
    return channel.id;
  }

  async joinChannel(channelId:number, userId:string, channelPassword:string) {
    const channel = await this.chatchannelRepository.findOne({id:channelId});
    if (!channel)
      throw new NotFoundException("없는 채팅방입니다");
    if (await this.blockmemberRepository.findOne({userId, channelId}))
      throw new ForbiddenException("밴 먹은 사용자입니다");
    if (channel.type == 1){
      const auth = await bcrypt.compare(channelPassword, channel.password);//channelPassword = null일때?
      if (!auth)
        throw new ForbiddenException("아이디 혹은 비밀번호가 틀림");//보안을 위해 모호한 표현
    }
    else if (channel.type == 2)
      throw new ForbiddenException("private방에 초대 없이는 못들어 갑니다")
    if (await this.chatmemberRepository.findOne({channelId, userId}))
      throw new BadRequestException("이미 있는 채팅방에 참여중인 사용자임");
    const newMember = new Chatmember();
    newMember.userId = userId;
    newMember.channelId = channelId;
    await this.chatmemberRepository.save(newMember);
    this.eventsGateway.server.to(`channel-${channelId}`).emit('join', null);
    return channelId;
  }

  async getOutChnnel(channelId:number, userId:string) {
    if (!(await this.chatmemberRepository.findOne({channelId, userId})))
      throw new NotFoundException("없는 채팅방이거나, 유저가 채팅방에 없음");
    await this.chatmemberRepository.delete({channelId, userId});
    this.eventsGateway.server.to(`channel-${channelId}`).emit('leave', null);
    return channelId;
  }

  async inviteChannel(channelId:number, administerId:string, visitorId:string) {
      const administer = await this.chatmemberRepository.findOne({where : {channelId, userId : administerId}});
      console.log("admin:", administer);
      if (!administer || administer.auth < 1)
        throw new ForbiddenException("administer가 아닌데 초대를 시도함.");
      if (await this.blockmemberRepository.findOne({userId:visitorId, channelId}))
        throw new ForbiddenException("밴 먹은 사용자입니다");
      if (await this.chatmemberRepository.findOne({channelId, userId:visitorId}))
        throw new BadRequestException("이미 채팅방에 있는 사용자임");
      if (!await this.chatchannelRepository.findOne({id:channelId}))
        throw new NotFoundException("없는 채팅방입니다");
      if (!(await this.usersRepository.findOne({userId:visitorId})))
        throw new NotFoundException("초대하려는 사람이 없는 사용자입니다.");
      const newMember = new Chatmember();
      newMember.userId = visitorId;
      newMember.channelId = channelId;
      await this.chatmemberRepository.save(newMember);
      this.eventsGateway.server.to(`channel-${channelId}`).emit('join', null);
      return channelId;
  }

  async sendMessage(channelId:number, sender:string, msg:string) { //미완성
    if (!(await this.chatchannelRepository.findOne({id:channelId})))
      throw new NotFoundException("없는 채팅방 입니다");
    if (!await this.chatmemberRepository.findOne({channelId, userId:sender}))
      throw new ForbiddenException("채팅방에 없는 사용자인데 메시지를 보내려고 함");
    if (await this.checkMuteState(channelId, sender) == true)
      throw new ForbiddenException("mute된 사용자이기때문에 메시지를 보낼수 없음.")
    const chatContent = new Chatcontent();
    chatContent.userId = sender;
    chatContent.channelId = channelId;
    chatContent.message = msg;
    const chatContentInfo = await this.chatcontentRepository.save(chatContent);
    const id = chatContentInfo.id;
    const userId = chatContentInfo.userId;
    //const channelId = chatContentInfo.channelId;
    //const message = chatContentInfo.message;
    const createdAt = chatContentInfo.createdAt;
    const updatedAt = chatContentInfo.updatedAt;
    const data = { id, userId, channelId, msg, createdAt, updatedAt };
    this.eventsGateway.server.to(`channel-${channelId}`).emit('ch', data);
  }

  async getAllMessage(channelId:number, userId:string) {
    if (!await this.chatmemberRepository.findOne({channelId, userId}))
      throw new ForbiddenException("채팅방에 없는 사용자인데 메시지를 조회하려고 함"); 
    const chatContent = await this.chatcontentRepository.find({where:{channelId}, select:["userId", "message", "updatedAt"],order: {
      createdAt: "DESC",
  }})
    return chatContent;
  }

  async get20Message(channelId:number, userId:string, skip:number){
    if (!await this.chatmemberRepository.findOne({channelId, userId}))
      throw new ForbiddenException("채팅방에 참여중이지 않은 사용자인데 메시지를 조회하려고 함"); 
    const query = await this.chatcontentRepository.createQueryBuilder('m')
    .where("m.channelId=:channelId", {channelId})
    .select(["m.userId", "m.message", "m.updatedAt"]);
    const [list, count] = await query.skip(skip).take(20)
      .getManyAndCount();
    return list;
  }

  async userListOnlyId(channelId:number, userId:string) {
    const userList = await this.chatmemberRepository.find({where:{channelId}});
    let ret = new Array();
    let size = userList.length;
    while (size--){
      ret[size] = userList[size].userId;
    }
    return ret;
  }

  async userList(channelId:number, userId:string) {
    const userList = await this.chatmemberRepository.find({where:{channelId}});
    return userList
    /*
    if (!await this.chatmemberRepository.find({channelId, userId}))
      throw new ForbiddenException("채팅방에 없는 사용자인데 참여자 목록을 보려고 함");
    //const userList = await this.chatmemberRepository.find({channelId})
    const userList = await this.chatchannelRepository.createQueryBuilder('c')
    .leftJoin('c.Chatmembers', 'm')
    .where("c.id=:channelId", {channelId})
    .select(["c.id", "c.name", "c.type", "c.createdAt", "c.updatedAt", "c.deleteAt", "m.userId", "m.auth", "m.mute"])
    .getOne();
    console.log(userList);
    return userList;
    */
  }

  async mutedMembers(channelId, userId){
    // if ((!await this.chatmemberRepository.findOne({userId, channelId})))
    //   throw new ForbiddenException("볼 권한이 없음")
    const ret = this.chatmemberRepository.find({where:{channelId, mute:true}});
    return ret;
  }

  async checkMuteState(channelId:number, userId:string) :Promise<boolean>{
    if (!await this.chatmemberRepository.findOne({channelId, userId}))
      throw new ForbiddenException(".");
    const chatmember = await this.chatmemberRepository.findOne({where:{channelId, userId}});
    let expired:Date = chatmember.muteExpired;
    let now:Date = new Date();
    if (!chatmember.mute){
      return false;
    }
    else if (expired < now){
      await this.chatmemberRepository.update({userId}, {mute:false})
      return false;
    }
    else{
      return true;
    }
  }

  async checkBanState(channelId:number, userId:string) :Promise<boolean>{
    const chatmember = await this.chatmemberRepository.findOne({where:{channelId, userId}});
    if (chatmember === null)
      return true;//아직 채팅방 참여하지 않은 사용자나 밴이 된 사용자나 똑같은 취급을 받게되는 문제
    return false;
  }

  async checkAdmin(channelId:number, userId:string) {
    const chatmember = await this.chatmemberRepository.findOne({where:{channelId, userId}});
    if (!chatmember)
      return false;//bool로 반환? 
    else 
      return (chatmember.auth > 0);
  }

  async checkOwner(channelId:number, userId:string) {
    const chatmember = await this.chatmemberRepository.findOne({where:{channelId, userId}});
    if (!chatmember)
      return false;//bool로 반환? 
    else 
      return (chatmember.auth > 1);
  }

  async giveAdmin(channelId:number, ownerId:string, userId:string) {
    if (await this.checkAdmin(channelId, ownerId) == false)
      throw new ForbiddenException("권한 없음");
    await this.chatmemberRepository.update({channelId, userId}, {auth:1})
    this.eventsGateway.server.to(`channel-${channelId}`).emit('admin', null);
  }

  async removeAdmin(channelId:number, ownerId:string, userId:string) {
    if (await this.checkAdmin(channelId, ownerId) == false)
      throw new ForbiddenException("권한 없음");
    await this.chatmemberRepository.update({channelId, userId}, {auth:0})
    this.eventsGateway.server.to(`channel-${channelId}`).emit('admin', null);
  }

  async banUser(channelId:number, adminId:string, banId:string) {
    if (!await this.chatmemberRepository.findOne({channelId, userId:adminId}))
      throw new ForbiddenException("채팅방에 없는 사용자임");
    const banUser = await this.chatmemberRepository.findOne({channelId, userId:banId});
    if (!banUser)
      throw new ForbiddenException("채팅방에 없는 사용자임");
    else if ((await banUser).auth > 0)
      throw new ForbiddenException("관리자나 소유자를 ban할 수는 없음");
    if (await this.checkAdmin(channelId, adminId) == false)
      throw new ForbiddenException("권한 없음");
    await this.chatmemberRepository.delete({channelId, userId:banId});
    const banRegister = new Blockmember();
    banRegister.channelId = channelId;
    banRegister.userId = banId;
    await this.blockmemberRepository.save(banRegister);
    this.eventsGateway.server.to(`channel-${channelId}`).emit('ban', null);
  }

  async removeBan(channelId:number, adminId:string, banId:string){
    if (await this.checkAdmin(channelId, adminId) == false)
      throw new ForbiddenException("소유주나 관리자만 밴을 풀수있음");
    await this.blockmemberRepository.delete({userId:banId});
  }

  async kickUser(channelId:number, adminId:string, kickId:string) {
    if (!await this.chatmemberRepository.findOne({channelId, userId:adminId}))
      throw new ForbiddenException("채팅방에 없는 사용자임");
    const banUser = await this.chatmemberRepository.findOne({channelId, userId:kickId});
    if (!banUser)
      throw new ForbiddenException("채팅방에 없는 사용자임");
    else if ((await banUser).auth > 0)
      throw new ForbiddenException("관리자나 소유자를 ban할 수는 없음");
    if (await this.checkAdmin(channelId, adminId) == false)
      throw new ForbiddenException("권한 없음");
    await this.chatmemberRepository.delete({channelId, userId:kickId});
    this.eventsGateway.server.to(`channel-${channelId}`).emit('ban', null);
  }

  async updateChannel(channelId:number, userId:string, channelName:string, channelType:number, channelPassword:string){
    if (!await this.chatchannelRepository.findOne({id:channelId}))
      throw new NotFoundException("없는 채팅방입니다");
    if (await this.checkOwner(channelId, userId) == false)
      throw new ForbiddenException("소유자가 아닙니다");
    const name = !channelName ? await (await this.chatchannelRepository.findOne({id:channelId})).name : channelName;
    const type = !channelType ? await (await this.chatchannelRepository.findOne({id:channelId})).type : channelType;//null아니고 NaN
    const password = !channelPassword ? await (await this.chatchannelRepository.findOne({id:channelId})).password : bcrypt(channelPassword, 12);
    if (type !== 0 && type !== 1 && type !== 2)
      throw new BadRequestException("채팅방 타입은 0,1,2만 올수있음");
    if (await this.chatchannelRepository.findOne({name, type}))
      throw new BadRequestException("이미 존재하는 채팅방입니다");
    await this.chatchannelRepository.update({id:channelId}, {name, type, password});
    return {channelId, channelName, channelType};
  }

  private async getChannelData(channelId:number){
    return await this.chatchannelRepository.findOne({id:channelId});
  }
  
  async updateChannelName(channelId:number, userId:string, channelName:string) {
    if (!await this.chatchannelRepository.findOne({id:channelId}))
      throw new NotFoundException("없는 채팅방입니다");
    const channelData = await this.getChannelData(channelId);
    if (await this.checkOwner(channelId, userId) == false)
      throw new ForbiddenException("소유자가 아닙니다");
    const name = channelName;
    if (await this.checkOwner(channelId, userId) == false)
      throw new ForbiddenException("권한없음.");
    if (await this.chatchannelRepository.findOne({name, type:channelData.type}) && name != channelData.name)
      throw new BadRequestException("이미 존재하는 채팅방입니다");
    await this.chatchannelRepository.update({id:channelId}, {name})
    this.eventsGateway.server.to(`channel-${channelId}`).emit('channelType', null);
    return name;
  }
  
  async updateChannelType(channelId:number, userId:string, channelType:number) {
    if (!await this.chatchannelRepository.findOne({id:channelId}))
      throw new NotFoundException("없는 채팅방입니다");
    const channelData = await this.getChannelData(channelId);
    if (await this.checkOwner(channelId, userId) == false)
      throw new ForbiddenException("소유자가 아닙니다");
    const type = channelType;//null아니고 NaN
    if (type !== 0 && type !== 1 && type !== 2)
      throw new BadRequestException("채팅방 타입은 0,1,2만 올수있음");
    if (await this.chatchannelRepository.findOne({name:channelData.name, type}) && type != channelData.type){
      console.log(channelData.name, "    ", type, "    ", channelType);
      throw new BadRequestException("이미 존재하는 채팅방입니다");
    }
    if (await this.checkOwner(channelId, userId) == false)
      throw new ForbiddenException("권한없음.");
    await this.chatchannelRepository.update({id:channelId}, {type})
    this.eventsGateway.server.to(`channel-${channelId}`).emit('channelType', null);
    return type;
  }


  
  async updateChannelPassword(channelId:number, userId:string, channelPassword:string) {
    if (!await this.chatchannelRepository.findOne({id:channelId}))
      throw new NotFoundException("없는 채팅방입니다");
    if (await this.checkOwner(channelId, userId) == false)
      throw new ForbiddenException("소유자가 아닙니다");
    const password = !channelPassword ? await (await this.chatchannelRepository.findOne({id:channelId})).password : channelPassword;
    if (await this.checkOwner(channelId, userId) == false)
      throw new ForbiddenException("권한없음.");
    const newPassword = await bcrypt.hash(password, 12);
    await this.chatchannelRepository.update({id:channelId}, {password : newPassword});
    this.eventsGateway.server.to(`channel-${channelId}`).emit('channelType', null);
  }

  async muteSwitch(channelId, adminId, muteId, time:number) {
    if (await this.checkAdmin(channelId, adminId) == false)
      throw new ForbiddenException(".");
    const muteUser = await this.chatmemberRepository.findOne({channelId, userId:muteId});
    if(!muteUser)
      throw new BadRequestException("그런 사용자가 없습니다");
    const expiredTime:Date = new Date(+(new Date()) + time * 1000);
    await this.chatmemberRepository.update({channelId, userId:muteId}, {mute:!muteUser.mute, muteExpired:expiredTime});
    setTimeout(() => {(async () => {
      await this.chatmemberRepository.update({channelId, userId:muteId
      }, {mute:false}).then(()=>{this.eventsGateway.server.to(`channel-${channelId}`).emit('mute', null);}) })(); }, time * 1000);
    this.eventsGateway.server.to(`channel-${channelId}`).emit('mute', null);
  }


  async deleteChannel(channelId:number, ownerId:string) {//사이트
    if (!await this.chatchannelRepository.findOne({id:channelId}))
      throw new BadRequestException("없는 채팅방임");
    if (await this.checkOwner(channelId, ownerId) == false)
      throw new ForbiddenException("권한 없음");
    await this.chatchannelRepository.delete({id:channelId});
    this.eventsGateway.server.to(`channel-${channelId}`).emit('channelDelete', null);
  }

  async achievementChannelNumber(userId:string){
    const numberOfChannel = await this.chatmemberRepository.count({userId});
    const user = await this.usersRepository.findOne({userId});
    const star = user.maxStarOfChannels;
    
    if (Math.floor(numberOfChannel / 5) > star && (numberOfChannel / 5 <= 5)){
      const now = Date();
      await this.usersRepository.update({userId}, {maxStarOfChannels:Math.floor(numberOfChannel / 5), maxStarOfChannelsTime:now});
      return {number:numberOfChannel, star:Math.floor(numberOfChannel / 5), time:now};
    }
    return {number:numberOfChannel, star, time:user.maxStarOfChannelsTime}
  }

  async siteOwnerChannelList(userId:string){
    const isSiteOwner = await this.usersRepository.findOne({where:[{userId, admin:true}, {userId, moderator:true}]});
    if (!isSiteOwner)
      throw new ForbiddenException("권한 없음");
    const list = await this.chatchannelRepository.find({});
    return list;
  }

  async siteOwnerChannelDelete(channelId:number ,userId:string){
    const isSiteOwner = await this.usersRepository.findOne({where:[{userId, admin:true}, {userId, moderator:true}]});
    if (!isSiteOwner)
      throw new ForbiddenException("권한 없음");
    await this.chatchannelRepository.delete({id:channelId});
  }

  async siteOwnerChannelUserMuteSwitch(channelId:number, userId:string, muteId:string, time:number){
    const isSiteOwner = await this.usersRepository.findOne({where:[{userId, admin:true}, {userId, moderator:true}]});
    if (!isSiteOwner)
      throw new ForbiddenException("권한 없음");
      const muteUser = await this.chatmemberRepository.findOne({channelId, userId:muteId});
      if(!muteUser)
        throw new BadRequestException("그런 사용자가 없습니다");
    const expiredTime:Date = new Date(+(new Date()) + time * 1000);
    await this.chatmemberRepository.update({channelId, userId:muteId}, {mute:!muteUser.mute, muteExpired:expiredTime});
    setTimeout(() => {(async () => {
      await this.chatmemberRepository.update({channelId, userId:muteId
      }, {mute:false}).then(()=>{this.eventsGateway.server.to(`channel-${channelId}`).emit('mute', null);}) })(); }, time * 1000);
    this.eventsGateway.server.to(`channel-${channelId}`).emit('mute', null);
  }

  async siteOwnerChannelUserAdmin(channelId:number, userId:string, givenId:string){
    const isSiteOwner = await this.usersRepository.findOne({where:[{userId, admin:true}, {userId, moderator:true}]});
    if (!isSiteOwner)
      throw new ForbiddenException("권한 없음");
    const given = await this.chatmemberRepository.findOne({userId:givenId, channelId});
    if (given.auth == 2){
      throw new ForbiddenException("소유자의 권한을 뺏을수는 없음")
    }
    await this.chatmemberRepository.update({userId:givenId, channelId}, {auth:1});
  }

  async siteOwnerChannelUserAdminRemove(channelId:number, userId:string, givenId:string){
    const isSiteOwner = await this.usersRepository.findOne({where:[{userId, admin:true}, {userId, moderator:true}]});
    if (!isSiteOwner)
      throw new ForbiddenException("권한 없음");
    const removed = await this.chatmemberRepository.findOne({userId:givenId, channelId});
    if (removed.auth == 2){
      throw new ForbiddenException("소유자의 권한을 뺏을수는 없음")
    }
    await this.chatmemberRepository.update({userId:givenId, channelId}, {auth:0});
  }

  async siteOwnerChannelUserBan(channelId:number, userId:string, banId:string){
    const isSiteOwner = await this.usersRepository.findOne({where:[{userId, admin:true}, {userId, moderator:true}]});
    if (!isSiteOwner)
      throw new ForbiddenException("권한 없음");
    const removed = await this.chatmemberRepository.findOne({userId:banId, channelId});
    if (removed.auth == 2){
      throw new ForbiddenException("소유자를 밴할수는 없음")
    }
    const newBan = new Blockmember();
    newBan.userId = banId;
    newBan.channelId = channelId;
    await this.blockmemberRepository.save(newBan);
    await this.chatmemberRepository.delete({userId:banId, channelId});
  }

  async siteOwnerChannelUserBanRemove(channelId:number, userId:string, banId:string){
    const isSiteOwner = await this.usersRepository.findOne({where:[{userId, admin:true}, {userId, moderator:true}]});
    if (!isSiteOwner)
      throw new ForbiddenException("권한 없음");
    await this.blockmemberRepository.delete({userId:banId, channelId});
  }

  async siteOwnerChannelUserKick(channelId:number, userId:string, banId:string){
    const isSiteOwner = await this.usersRepository.findOne({where:[{userId, admin:true}, {userId, moderator:true}]});
    if (!isSiteOwner)
      throw new ForbiddenException("권한 없음");
    const removed = await this.chatmemberRepository.findOne({userId:banId, channelId});
    if (removed.auth == 2){
      throw new ForbiddenException("소유자를 킥할수는 없음")
    }
    await this.chatmemberRepository.delete({userId:banId, channelId});
  }

}
