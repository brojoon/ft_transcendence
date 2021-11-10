import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dm } from 'src/entities/Dm';
import { Dmcontent } from 'src/entities/Dmcontent';
import { Users } from 'src/entities/Users';
import { EventsGateway } from 'src/events/events.gateway';
import { Repository } from 'typeorm';

@Injectable()
export class DmsService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Dm) private dmRepository: Repository<Dm>,
    @InjectRepository(Dmcontent) private DmcontentRepository: Repository<Dmcontent>,
    private eventsGateway:EventsGateway
  ) { }

  async checkHaveUser(userId1:string, userId2:string) {
    try {
      const user1 = await this.usersRepository.findOne({ where: { userId: userId1 } });
      const user2 = await this.usersRepository.findOne({ where: { userId: userId2 } });
      if (user1 && user2)
        return (false);
      else
        return (true);  
    } catch (error) {
      throw new ForbiddenException('유효한 유저 조회 실패');
    }
  }

  async findDmUser(dmId: number, userId: string) {
    const result = await this.DmcontentRepository.findOne({ where: { dmId } });
    if (!result)
      throw new ForbiddenException('존재하지 않는 DM방입니다.');
    if (result.userId1 === userId)
      return result.userId2
    else if (result.userId2 === userId)
      return result.userId1
    else
      throw new ForbiddenException('내가 속한 DM방이 아닙니다');
  }

  async createAndGetDm(userId1:string, userId2:string) {
    if (await this.checkHaveUser(userId1, userId2))
      throw new ForbiddenException('잘못된 유저 정보 입니다.');
    try {
      const checkdm = await this.dmRepository
        .createQueryBuilder('dm')
        .innerJoin('dm.Dmcontents','dc')
        .where('dc.userId1 = :userId1 AND dc.userId2 = :userId2', { userId1, userId2 })
        .orWhere('dc.userId1 = :userId2 AND dc.userId2 = :userId1', { userId2, userId1 })
        .getOne(); 
      if (checkdm)
        return checkdm.id; // userId1 과 userId2의 DM방 id
      const newDm = new Dm();
      const result = await this.dmRepository.save(newDm);
      const newDmcontent = new Dmcontent();
      newDmcontent.dmId = result.id;
      newDmcontent.userId1 = userId1;
      newDmcontent.userId2 = userId2;
      newDmcontent.message = process.env.DB;
      await this.DmcontentRepository.save(newDmcontent);
      return (newDm.id);   
    } catch (error) {
      throw new ForbiddenException('DM방 생성 및 번호 조회 실패');
    }
  }
  
  async getDmListOnlyID(userId: string, type: boolean) {
    if (await this.checkHaveUser(userId, userId))
      throw new ForbiddenException('잘못된 유저 정보 입니다.');
    try {
      const checkdm = await this.dmRepository
        .createQueryBuilder('dm')
        .select(['dm.id'])
        .leftJoin("dm.Dmcontents","dc")
        .where('dc.userId1 = :userId AND dc.message = :ms ', { userId, ms: process.env.DB })
        .orWhere('dc.userId2 = :userId AND dc.message = :ms ', { userId, ms: process.env.DB })
        .getMany();
      if (type){
        const arr = [];
        for(var i in checkdm) {
          arr.push(checkdm[i].id);
        }    
        return (arr)
      }
      return checkdm;
    } catch (error) {
      throw new ForbiddenException('DM 리스트 조회 실패');
    }
  }

  async getDmList(userId: string) {
    if (await this.checkHaveUser(userId, userId))
      throw new ForbiddenException('잘못된 유저 정보 입니다.');
    try {
      const checkdm = await this.dmRepository
        .createQueryBuilder('dm')
        .select(['dm.id', 'dc.userId1', 'dc.userId2'],)
        .leftJoin("dm.Dmcontents","dc")
        .where('dc.userId1 = :userId AND dc.message = :ms ', { userId, ms: process.env.DB })
        .orWhere('dc.userId2 = :userId AND dc.message = :ms ', { userId, ms: process.env.DB })
        .getMany();
      return (checkdm)
    } catch (error) {
      throw new ForbiddenException('DM 리스트 조회 실패');
    }
  }

  async sendMessage(userId1:string, userId2:string, message:string, match:number = 0, historyId:number = null) {
    if (await this.checkHaveUser(userId1, userId2))
      throw new ForbiddenException('잘못된 유저 정보 입니다.');
    try {
      const dmId =  await this.createAndGetDm(userId1, userId2);
      const send = new Dmcontent();
      send.dmId = dmId;
      send.userId1 = userId1;
      send.userId2 = userId2;
      if (match)
        send.message = "대국신청";
      else
        send.message = message;
      send.match = match;
      send.historyId = historyId;
      const dm = await this.DmcontentRepository.save(send);
      const data = { dmId, userId1, userId2, message: dm.message, match, historyId, createdAt: dm.createdAt };
      this.eventsGateway.server.to(`dm-${dm.dmId}`).emit('dm', data); 
    } catch (error) {
      throw new ForbiddenException('메세지 전송 실패');
    }
  }

  async sendMessageUserDmId(userId1:string, dmId:number, message:string, match:number = 0, historyId:number = null) {
    const result = await this.usersRepository.findOne({where: { userId: userId1}});
    if (!result)
      throw new ForbiddenException('유저 정보 없음');
    try {
      const userId2 = await this.findDmUser(dmId, userId1);
      const send = new Dmcontent();
      send.dmId = dmId;
      send.userId1 = userId1;
      send.userId2 = userId2;
      if (match)
        send.message = "대국신청";
      else
        send.message = message;
      send.match = match;
      send.historyId = historyId;
      const dm = await this.DmcontentRepository.save(send);
      const data = { dmId, userId1, userId2, message: dm.message, match, historyId, createdAt: dm.createdAt };
      this.eventsGateway.server.to(`dm-${dm.dmId}`).emit('dm', data);
    } catch (error) {
      throw new ForbiddenException('메세지 전송 실패');
    }
  }

  async getAllMessage(userId1:string, userId2:string) {
    if (await this.checkHaveUser(userId1, userId2))
      throw new ForbiddenException('잘못된 유저 정보 입니다.');
    try {
      const result = await this.DmcontentRepository
        .createQueryBuilder()
        .where('userId1 = :userId1 AND userId2 = :userId2', { userId1, userId2 })
        .orWhere('userId1 = :userId2 AND userId2 = :userId1', { userId2, userId1 })
        .orderBy('createdAt', 'DESC')
        .getMany();
      return (result);
    } catch (error) {
      throw new ForbiddenException('메세지 조회 실패');
    }
  }

  async getAllMessageUseDmId(userId: string, dmId:number) {
    const result = await this.DmcontentRepository.findOne({ where: { dmId } });
    if (!result)
      throw new ForbiddenException('존재하지 않는 DM방입니다.');
    if (result.userId1 !== userId && result.userId2 !== userId)
      throw new ForbiddenException('내가 속한 DM방이 아닙니다');
    try {
      const res = await this.DmcontentRepository
        .createQueryBuilder()
        .where('dmId = :dmId', { dmId })
        .orderBy('createdAt', 'DESC')
        .getMany();
      return (res);  
    } catch (error) {
      throw new ForbiddenException('메세지 조회 실패');
    }
  }
}
