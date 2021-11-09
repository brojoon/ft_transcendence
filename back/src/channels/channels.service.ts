import { UnauthorizedException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chatchannel } from 'src/entities/Chatchannel';
import { Chatcontent } from 'src/entities/Chatcontent';
import { Chatmember } from 'src/entities/Chatmember';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { NotFoundError, timeout } from 'rxjs';
@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Chatchannel) private chatchannelRepository: Repository<Chatchannel>,
    @InjectRepository(Chatmember) private chatmemberRepository: Repository<Chatmember>,
    @InjectRepository(Chatcontent) private chatcontentRepository: Repository<Chatcontent>,
  ) { }

  private salt:number;

  // private 제외
  async allChannelList() {
    //const ret = await this.chatchannelRepository.find({select : ["id", "name", "type", "createdAt", "deleteAt", "updatedAt"]});
    const ret = await this.chatchannelRepository.find({select:["id", "name", "type", "authId", "createdAt", "updatedAt", "deleteAt"]});
    return ret;
  }
  
  
  async myChannelList(userid:string) {
    const ret = await this.chatchannelRepository.createQueryBuilder('c')
    .leftJoin('c.Chatmembers', 'm')
    .where('m.userId = :userid', {userid})
    .select (["c.id", "c.name", "c.authId", "c.type", "c.createdAt", "c.deleteAt", "c.updatedAt"])
    .getMany();

    return ret;
  }

  async makeChannel(userId:string, channelName:string, channelType:number, password:string) {
    //const obj:Chatchannel = {};
    if (await this.chatchannelRepository.findOne({name:channelName}))
      throw new BadRequestException("이미 존재하는 이름의 채팅방입니다");
    const newChannel = new Chatchannel();
    newChannel.name = channelName;
    newChannel.type = channelType;
    newChannel.authId = userId;
    console.log("password:", password);
    if (password)
    {
      console.log("password true:", password);
      const newPassword = await bcrypt.hash(password, 12);
      console.log("new password : ", newPassword);
      newChannel.password = newPassword;
    }
    const channel = await this.chatchannelRepository.save(newChannel);

    const newMember = new Chatmember();
    newMember.userId = userId;
    newMember.channelId = channel.id;
    newMember.auth = 2;
    const member = await this.chatmemberRepository.save(newMember);
  }

  async joinChannel(channelId:number, userId:string, channelPassword:any = null) {
    const channel = await this.chatchannelRepository.findOne({id:channelId});
    if (!channel)
      throw new UnauthorizedException("없는 채팅방입니다");
    if (channel.type == 1)
    {
      const test = await bcrypt.compare(channelPassword, channel.password);//channelPassword = null일때?
      if (!test)
        throw new UnauthorizedException("아이디 혹은 비밀번호가 틀림");//보안을 위해
    }
    else if (channel.type == 2)
      throw new BadRequestException("private방에 초대 없이는 못들어 갑니다")
    const temp = await this.chatmemberRepository.findOne({channelId, userId});
    console.log(temp);
    if (temp)
      console.log("ture");
    else
      console.log("false");
    if (await this.chatmemberRepository.findOne({channelId, userId}))
      throw new UnauthorizedException("이미 채팅방에 참여중인 사용자임");
    console.log("\n\n\n\n\n\n\n 도달 \n\n\n\n\n");
    const newMember = new Chatmember();
    newMember.userId = userId;
    newMember.channelId = channelId;
    await this.chatmemberRepository.save(newMember);
  }

  async getOutChnnel(channelId:number, userId:string) {
    if (!(await this.chatmemberRepository.findOne({channelId, userId})))
      throw new UnauthorizedException("채팅방에 참여중인 사용자가 아닌데, 채팅방 탈퇴를 하려고 함");
    await this.chatmemberRepository.delete({channelId, userId});
  }

  async inviteChannel(channelId:number, administerId:string, visitorId:string) {
      const administer = await this.chatmemberRepository.findOne({where : {channelId, userId : administerId}});
      if (!administer || administer.auth < 1)
        throw new UnauthorizedException("administer가 아닌데 초대를 시도함.");
      if (await this.chatmemberRepository.findOne({channelId, userId:visitorId}))
        throw new UnauthorizedException("이미 채팅방에 참여중인 사용자임");
      const newMember = new Chatmember();
      newMember.userId = visitorId;
      newMember.channelId = channelId;
      await this.chatmemberRepository.save(newMember);
  }

  async sendMessage(channelId:number, sender:string, msg:string) {//미완성
    if (!this.chatmemberRepository.find({channelId, userId:sender}))
      throw new UnauthorizedException("채팅방에 참여중이지 않은 사용자인데 메시지를 보내려고 함");
    const chatContent = new Chatcontent();
    chatContent.userId = sender;
    chatContent.channelId = channelId;
    chatContent.message = msg;
    await this.chatcontentRepository.save(chatContent);
  }

  async getAllMessage(channelId:number, userId:string) {
    if (!this.chatmemberRepository.find({channelId, userId}))
      throw new UnauthorizedException("채팅방에 참여중이지 않은 사용자인데 메시지를 조회하려고 함"); 
    const chatContent = await this.chatcontentRepository.find({where:{channelId}, select:["userId", "message", "updatedAt"]})
    return chatContent;
  }

  async userList(channelId:number, userId:string) {
    /*
    const userList = await this.chatchannelRepository.createQueryBuilder('c')
    .leftJoin('c.Chatmembers', 'm')
    .where('c.id = :channelId', {channelId : channelId})
    //.select(["userId"])
    .getMany();
    */
    if (!this.chatmemberRepository.find({channelId, userId}))
      throw new UnauthorizedException("채팅방에 참여중이지 않은 사용자인데 참여자 목록을 보려고 함");
    //const userList = await this.chatmemberRepository.find({channelId})
    const userList = await this.chatchannelRepository.createQueryBuilder('c')
    .leftJoin('c.Chatmembers', 'm')
    .select(["c.id", "c.name", "c.type", "c.createdAt", "c.updatedAt", "c.deleteAt", "m.userId", "m.auth", "m.mute"])
    .getMany();
    return userList;
  }

  async checkMuteState(channelId:number, userId:string) :Promise<boolean>{
    if (!this.chatmemberRepository.find({channelId, userId}))
      throw new UnauthorizedException("채팅방에 참여중이지 않은 사용자임");
    const chatmember = await this.chatmemberRepository.findOne({where:{channelId, userId}});
    return chatmember.mute;
  }

  async checkBanState(channelId:number, userId:string) :Promise<boolean>{
    const chatmember = await this.chatmemberRepository.findOne({where:{channelId, userId}});
    if (chatmember === null)
      return true;//아직 채팅방 참여하지 않은 사용자나 밴이 된 사용자나 똑같은 취급을 받게되는 문제
    return false;
  }

  async checkAdmin(channelId:number, userId:string) {
    const chatmember = await this.chatmemberRepository.findOne({where:{channelId, userId}});
    return (chatmember.auth > 0);//bool로 반환? 
  }

  async checkOwner(channelId:number, userId:string) {
    const chatmember = await this.chatmemberRepository.findOne({where:{channelId, userId}});
    return (chatmember.auth > 1);//bool로 반환? 
  }

  async giveAdmin(channelId:number, ownerId:string, userId:string) {
    if (await this.checkAdmin(channelId, ownerId) == false)
      throw new UnauthorizedException(".");
    await this.chatmemberRepository.update({channelId, userId}, {auth:1})
  }

  async banUser(channelId:number, adminId:string, banId:string) {
    if (!this.chatmemberRepository.find({channelId, userId:adminId}))
      throw new UnauthorizedException("채팅방에 참여중이지 않은 사용자임");
    const banUser = this.chatmemberRepository.findOne({channelId, userId:banId});
    if (!banUser)
      throw new UnauthorizedException("채팅방에 참여중이지 않은 사용자임");
    else if ((await banUser).auth > 0)//여기도 await??
      throw new UnauthorizedException("관리자나 소유자를 ban할 수는 없음")
    if (await this.checkAdmin(channelId, adminId) == false)
      throw new UnauthorizedException(".");
    await this.chatmemberRepository.delete({channelId, userId:banId});
    /*setTimeout(() => {
      await this.chatmemberRepository.update({channelId, userId}, {mute:true})
    }, timeout);*/
  }

  // 0 = publice,  1 = protected, 2 = private
  async updateType(channelId:number, userId:string, type:number) {
    if (await this.checkOwner(channelId, userId) == false)
      throw new UnauthorizedException(".");
    await this.chatchannelRepository.update({id:channelId}, {type})
  }

  async updateChannelName(channelId:number, userId:string, name:string) {
    if (await this.checkOwner(channelId, userId) == false)
      throw new UnauthorizedException(".");
    await this.chatchannelRepository.update({id:channelId}, {name})
  }

  async updateChannelPassword(channelId:number, userId:string, password:string) {
    if (await this.checkOwner(channelId, userId) == false)
      throw new UnauthorizedException(".");
    const newPassword = bcrypt.hash(password, 12);
    await this.chatchannelRepository.update({id:channelId}, {password : newPassword});
  }

  async muteSwitch(channelId, adminId, muteId, time:number) {
    if (await this.checkAdmin(channelId, adminId) == false)
      throw new UnauthorizedException(".");
    await this.chatmemberRepository.update({channelId, userId:muteId}, {mute:!`{mute}`});
    /*setTimeout(() => {
      await this.chatmemberRepository.update({channelId, userId}, {mute:true})
    }, timeout);*/
  }

  async deleteChannel(channelId:number, ownerId:string) {
    if (await this.checkOwner(channelId, ownerId) == false)
      throw new UnauthorizedException(".");
    await this.chatchannelRepository.delete({id:channelId});
  }

}
