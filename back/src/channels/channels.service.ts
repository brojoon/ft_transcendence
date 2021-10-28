import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chatchannel } from 'src/entities/Chatchannel';
import { Chatcontent } from 'src/entities/Chatcontent';
import { Chatmember } from 'src/entities/Chatmember';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Chatchannel) private chatchannelRepository: Repository<Chatchannel>,
    @InjectRepository(Chatmember) private chatmemberRepository: Repository<Chatmember>,
    @InjectRepository(Chatcontent) private chatcontentRepository: Repository<Chatcontent>,
  ) { }

  
}
