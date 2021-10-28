import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chatchannel } from 'src/entities/Chatchannel';
import { Chatcontent } from 'src/entities/Chatcontent';
import { Chatmember } from 'src/entities/Chatmember';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Chatchannel) private chatchannelRepository: Repository<Chatchannel>,
    @InjectRepository(Chatmember) private chatmemberRepository: Repository<Chatmember>,
    @InjectRepository(Chatcontent) private chatcontentRepository: Repository<Chatcontent>,
  ) { }

  // private 제외
  async allChannelList() {

  }

  async myChannelList() {

  }

  async makeChannel() {

  }

  async joinChannel() {

  }

  async getOutChnnel() {

  }

  async inviteChnnel() {

  }

  async snedMessage() {

  }

  async getAllMessage() {

  }

  async userList() {

  }

  async checkMuteState() {

  }

  async checkAdmin() {

  }

  async giveAdmin() {
    
  }

  async banUser() {
    
  }

  // 0 = publice,  1 = protected, 2 = private
  async updateType() {

  }

  async updateChannelName() {

  }

  async updateChannelPassword() {

  }

  async muteSwitch() {

  }

  async deleteChannel() {

  }

}
