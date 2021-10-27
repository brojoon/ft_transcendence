import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Block } from 'src/entities/Block';
import { Friend } from 'src/entities/Friend';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Friend) private friendRepository: Repository<Friend>,
    @InjectRepository(Block) private blockRepository: Repository<Block>,
  ) { }


  create(createFriendDto) {
    return 'This action adds a new friend';
  }
  
}
