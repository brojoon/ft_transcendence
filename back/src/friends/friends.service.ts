import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

  // 상태방이나 나나 Block해놓은 사람이면 친구 추가가 안되게
  async addFriend(userId1: string, userId2: string) {
    try {
      if (await this.checkFriend(userId1, userId2)){
        throw new ForbiddenException('친구 상태');
      }
      if (await this.checkBlock(userId1, userId2) || await this.checkBlock(userId2, userId1)) {
       throw new ForbiddenException('Block 상태');    
      }
      const newFriend1 = new Friend();
      newFriend1.userId1 = userId1;
      newFriend1.userId2 = userId2;
      await this.friendRepository.save(newFriend1);
      const newFriend2 = new Friend();
      newFriend2.userId1 = userId2;
      newFriend2.userId2 = userId1;
      await this.friendRepository.save(newFriend2);
      return (true);      
    } catch (error) {
      if (error.errno !== undefined || (error.response.statusCode !== 403 && error.response.statusCode !== 404))
        throw new BadRequestException("친구 추가 실패");
      else if (error.response.statusCode === 403)
        throw new ForbiddenException(error.response.message);
      else if (error.response.statusCode === 404)
        throw new NotFoundException(error.response.message);
    }
  }

  // 친구 상태이면 친구 상태 지우고 Block
  async addBlock(userId1: string, userId2: string) {
    try {
      if (await this.checkBlock(userId1, userId2))
        throw new ForbiddenException('이미 Block 상태');
      if (await this.checkFriend(userId1, userId2))
        this.removeFriend(userId1, userId2);
      const newBlock = new Block();
      newBlock.userId1 = userId1;
      newBlock.userId2 = userId2;
      await this.blockRepository.save(newBlock);
      return (true);    
    } catch (error) {
      if (error.errno !== undefined || (error.response.statusCode !== 403 && error.response.statusCode !== 400))
        throw new BadRequestException("BLOCK 추가 실패");
      else if (error.response.statusCode === 403)
        throw new ForbiddenException(error.response.message);
      else if (error.response.statusCode === 400)
        throw new NotFoundException(error.response.message);
    }
  }

  async removeFriend(userId1: string, userId2: string) {
    try {
      if (await this.checkFriend(userId1, userId2) && await this.checkFriend(userId2, userId1)) {
        await this.friendRepository.createQueryBuilder()
          .delete()
          .where('userId1 = :userId1', {userId1} )
          .andWhere('userId2 = :userId2', {userId2} )
          .execute();
        await this.friendRepository.createQueryBuilder()
          .delete()
          .where('userId1 = :userId2', {userId2} )
          .andWhere('userId2 = :userId1', {userId1} )
          .execute();        
        return (true);        
      }
      return (false);      
    } catch (error) {
      throw new BadRequestException("친구 삭제 실패");
    }
  }

  async removeBlock(userId1: string, userId2: string) {
    try {
      if (await this.checkBlock(userId1, userId2)) {
        await this.blockRepository.createQueryBuilder()
          .delete()
          .where('userId1 = :userId1', {userId1} )
          .andWhere('userId2 = :userId2', {userId2} )
          .execute();     
        return (true);        
      }
      return (false);      
    } catch (error) {
      throw new BadRequestException("Block 삭제 실패");
    }
  }

  async friendList(userId1: string) {
    try {
      const result = await this.friendRepository.find({
        select: ['userId2'],
        where: {userId1},  
      });
      return (result);      
    } catch (error) {
      throw new BadRequestException('친구 리스트 조회 실패');
    }
  }

  async BlockList(userId1: string) {
    try {
      const result = await this.blockRepository.find({
        select: ['userId2'],
        where: {userId1},  
      });
      return (result);      
    } catch (error) {
      throw new BadRequestException('BLOCK 리스트 조회 실패');
    }
  }

  async checkFriend(userId1: string, userId2: string){
    try {
      const  user =  await this.friendRepository.findOne({ where: { userId1, userId2 } });
      if (user)
        return (true);
      else
        return (false);      
    } catch (error) {
      throw new BadRequestException('친구 확인 실패');
    }
  }

  async checkBlock(userId1: string, userId2: string) {
    try {
      const  user =  await this.blockRepository.findOne({ where: { userId1, userId2 } });
      if (user)
        return (true);
      else
        return (false);      
    } catch (error) {
      throw new BadRequestException('BLOCK 확인 실패');
    }
  }
}
