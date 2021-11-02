import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
    const ret = await this.chatchannelRepository.find({select : ["id", "name", "type", "createdAt", "deleteAt", "updatedAt"]});

    return ret;
  }
  
  
  async myChannelList(userid:string) {
    const ret = await this.chatchannelRepository.createQueryBuilder('c')
    .leftJoin('c.Chatmembers', 'm')
    .where('m.userId = :userid', {userid})
    .select (["c.id", "c.name", "c.type", "c.createdAt", "c.deleteAt", "c.updatedAt"])
    .getMany();

    return ret;
  }

  async makeChannel(userId:string, channelName:string, channelType:number, password:string = null) {
    //const obj:Chatchannel = {};
    const newChannel = new Chatchannel();
    newChannel.name = channelName;
    newChannel.type = channelType;
    if (!password)
    {
      const newPassword = bcrypt.hash(password, 12);
      newPassword.
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
    const channel = await this.chatchannelRepository.findOne({where : {id:channelId}});
    if (channel.type == 1)
    {
      const test = bcrypt.compare(channelPassword, channel.password);//channelPassword = null일때?
      if (!test)
        throw new UnauthorizedException("비밀번호가 틀립니다");
    }
    
    const newMember = new Chatmember();
    newMember.userId = userId;
    newMember.channelId = channelId;
    await this.chatmemberRepository.save(newMember);
  }

  async getOutChnnel(channelId:number, userId:string) {
    await this.chatmemberRepository.delete({channelId, userId});
  }

  async inviteChnnel(channelId:number, administerId:string, visitorId:string) {
      const administer = await this.chatmemberRepository.findOne({where : {channelId, userId : administerId}});
      if (administer.auth < 1)
        throw new UnauthorizedException("administer가 아닌데 초대를 시도함.");
      const newMember = new Chatmember();
      newMember.userId = visitorId;
      newMember.channelId = channelId;
      await this.chatmemberRepository.save(newMember);
  }

  async sendMessage(channelId:number, sender:string, msg:string) {
    const chatContent = new Chatcontent();
    chatContent.userId = sender;
    chatContent.channelId = channelId;
    chatContent.message = msg;
    await this.chatcontentRepository.save(chatContent);
  }

  async getAllMessage(channelId:number) {
    const chatContent = await this.chatcontentRepository.find({where:{channelId}, select:["userId", "message", "updatedAt"]})
    return chatContent;
  }

  async userList(channelId:number) {
    const userList = await this.chatchannelRepository.createQueryBuilder('c')
    .leftJoin('c.Chatmembers', 'm')
    .where('c.id = :channelId', {channelId : channelId})
    //.select(["userId"])
    .getMany();

    return userList;
  }

  async checkMuteState(channelId:number, userId:string) :Promise<boolean>{
    const chatmember = await this.chatmemberRepository.findOne({where:{channelId, userId}});
    return chatmember.mute;
  }

  async checkBanState(channelId:number, userId:string) :Promise<boolean>{
    const chatmember = await this.chatmemberRepository.findOne({where:{channelId, userId}});
    if (chatmember === null)
      return true;
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

  async giveAdmin(channelId:number, userId:string) {
    if (await this.checkAdmin(channelId, userId) == false)
      throw new UnauthorizedException(".");
    await this.chatmemberRepository.update({channelId, userId}, {auth:1})
  }

  async banUser(channelId:number, userId:string) {
    if (await this.checkAdmin(channelId, userId) == false)
      throw new UnauthorizedException(".");
    await this.chatmemberRepository.delete({channelId, userId});
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

  async muteSwitch(channelId, userId, time:number) {
    if (await this.checkAdmin(channelId, userId) == false)
      throw new UnauthorizedException(".");
    await this.chatmemberRepository.update({channelId, userId}, {mute:!`{mute}`});
    /*setTimeout(() => {
      await this.chatmemberRepository.update({channelId, userId}, {mute:true})
    }, timeout);*/
  }

  async deleteChannel(channelId:number, userId:string) {
    if (await this.checkOwner(channelId, userId) == false)
      throw new UnauthorizedException(".");
    await this.chatchannelRepository.delete({id:channelId});
  }

}
