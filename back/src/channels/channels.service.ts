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
@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Chatchannel) private chatchannelRepository: Repository<Chatchannel>,
    @InjectRepository(Chatmember) private chatmemberRepository: Repository<Chatmember>,
    @InjectRepository(Chatcontent) private chatcontentRepository: Repository<Chatcontent>,
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
    if (await this.chatchannelRepository.findOne({name:channelName}))
      throw new BadRequestException("이미 있는 이름의 채팅방입니다");
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
      throw new BadRequestException("없는 채팅방입니다");
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
    return channelId;
  }

  async getOutChnnel(channelId:number, userId:string) {
    if (!(await this.chatmemberRepository.findOne({channelId, userId})))
      throw new ForbiddenException("없는 채팅방이거나, 유저가 채팅방에 없음");
    await this.chatmemberRepository.delete({channelId, userId});
    return channelId;
  }

  async inviteChannel(channelId:number, administerId:string, visitorId:string) {
      const administer = await this.chatmemberRepository.findOne({where : {channelId, userId : administerId}});
      console.log("admin:", administer);
      if (!administer || administer.auth < 1)
        throw new ForbiddenException("administer가 아닌데 초대를 시도함.");
      if (await this.chatmemberRepository.findOne({channelId, userId:visitorId}))
        throw new BadRequestException("이미 채팅방에 있는 사용자임");
      if (!await this.chatchannelRepository.find({id:channelId}))
        throw new BadRequestException("없는 채팅방입니다");
      if (!await this.usersRepository.find({userId:visitorId}))
        throw new BadRequestException("초대하려는 사람이 없는 사용자입니다.");
      const newMember = new Chatmember();
      newMember.userId = visitorId;
      newMember.channelId = channelId;
      await this.chatmemberRepository.save(newMember);
      return channelId;
  }

  async sendMessage(channelId:number, sender:string, msg:string) {//미완성
    if (!(await this.chatchannelRepository.find({id:channelId})))
      throw new BadRequestException("없는 채팅방 입니다");
    if (!await this.chatmemberRepository.find({channelId, userId:sender}))
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
    this.eventsGateway.server.to(`channel-${channelId}`).emit('ch', data)
  }

  async getAllMessage(channelId:number, userId:string) {
    if (!await this.chatmemberRepository.find({channelId, userId}))
      throw new ForbiddenException("채팅방에 없는 사용자인데 메시지를 조회하려고 함"); 
    const chatContent = await this.chatcontentRepository.find({where:{channelId}, select:["userId", "message", "updatedAt"],order: {
      createdAt: "DESC",
  }})
    return chatContent;
  }

  async get20Message(channelId:number, userId:string, skip:number){
    if (!await this.chatmemberRepository.find({channelId, userId}))
      throw new ForbiddenException("채팅방에 참여중이지 않은 사용자인데 메시지를 조회하려고 함"); 
    const query = await this.chatcontentRepository.createQueryBuilder('m')
    .where("m.channelId=:channelId", {channelId})
    .select(["m.userId", "m.message", "m.updatedAt"]);
    const [list, count] = await query.skip(skip).take(20)
      .getManyAndCount();
    return {list, TotalMessageNumber:count};
  }

  async userList(channelId:number, userId:string) {
    const userList = await this.chatmemberRepository.find({channelId});
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

  async checkMuteState(channelId:number, userId:string) :Promise<boolean>{
    if (!await this.chatmemberRepository.find({channelId, userId}))
      throw new ForbiddenException(".");
    const chatmember = await this.chatmemberRepository.findOne({where:{channelId, userId}});
    return chatmember.mute;
    let expired:Date = chatmember.muteExpired;
    let now:Date = new Date();
    if (!chatmember.mute){
      console.log("not mute");
      return false;
    }
    else if (expired < now){
      console.log("over the expired!!!");
      await this.chatmemberRepository.update({userId}, {mute:false})
      return false;
    }
    else{
      console.log("before the expired");
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
      throw new ForbiddenException(".");
    return (chatmember.auth > 0);//bool로 반환? 
  }

  async checkOwner(channelId:number, userId:string) {
    const chatmember = await this.chatmemberRepository.findOne({where:{channelId, userId}});
    if (!chatmember)
      throw new ForbiddenException(".");
    return (chatmember.auth > 1);//bool로 반환? 
  }

  async giveAdmin(channelId:number, ownerId:string, userId:string) {
    if (await this.checkAdmin(channelId, ownerId) == false)
      throw new ForbiddenException(".");
    await this.chatmemberRepository.update({channelId, userId}, {auth:1})
  }

  async banUser(channelId:number, adminId:string, banId:string) {
    if (!await this.chatmemberRepository.find({channelId, userId:adminId}))
      throw new ForbiddenException("채팅방에 없는 사용자임");
    const banUser = await this.chatmemberRepository.findOne({channelId, userId:banId});
    if (!banUser)
      throw new ForbiddenException("채팅방에 없는 사용자임");
    else if ((await banUser).auth > 0)//여기도 await??
      throw new ForbiddenException("관리자나 소유자를 ban할 수는 없음")
    if (await this.checkAdmin(channelId, adminId) == false)
      throw new ForbiddenException(".");
    await this.chatmemberRepository.delete({channelId, userId:banId});
    /*setTimeout(() => {
      await this.chatmemberRepository.update({channelId, userId}, {mute:true})
    }, timeout);*/
  }

  // 0 = publice,  1 = protected, 2 = private
  async updateType(channelId:number, userId:string, type:number) {
    if (await this.checkOwner(channelId, userId) == false)
      throw new ForbiddenException(".");
    await this.chatchannelRepository.update({id:channelId}, {type})
    return type;
  }

  async updateChannelName(channelId:number, userId:string, name:string) {
    if (await this.checkOwner(channelId, userId) == false)
      throw new ForbiddenException(".");
    await this.chatchannelRepository.update({id:channelId}, {name})
    
    return name;
  }

  async updateChannelPassword(channelId:number, userId:string, password:string) {
    if (await this.checkOwner(channelId, userId) == false)
      throw new ForbiddenException(".");
    const newPassword = await bcrypt.hash(password, 12);
    await this.chatchannelRepository.update({id:channelId}, {password : newPassword});
  }

  async muteSwitch(channelId, adminId, muteId, time:number) {
    if (await this.checkAdmin(channelId, adminId) == false)
      throw new ForbiddenException(".");
    const muteUser = await this.chatmemberRepository.findOne({channelId, userId:muteId});
    if(!muteUser)
      throw new BadRequestException("그런 사용자가 없습니다");
    const expiredTime:Date = new Date(+(new Date()) + time * 1000);
    console.log("now? ", new Date());
    console.log("expired Time: ", expiredTime, "mute?", !muteUser.mute);
    await this.chatmemberRepository.update({channelId, userId:muteId}, {mute:!muteUser.mute, muteExpired:expiredTime});
    setTimeout(() => { (async () => {await this.chatmemberRepository.update({channelId, userId:muteId}, {mute:false}) })(); }, 30 * 1000);
  }

  async deleteChannel(channelId:number, ownerId:string) {
    if (!await this.chatchannelRepository.find({id:channelId}))
      throw new BadRequestException("없는 채팅방임");
    if (await this.checkOwner(channelId, ownerId) == false)
      throw new ForbiddenException(".");
    await this.chatchannelRepository.delete({id:channelId});
  }

}
