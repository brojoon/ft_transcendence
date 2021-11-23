import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dm } from 'src/entities/Dm';
import { Dmcontent } from 'src/entities/Dmcontent';
import { History } from 'src/entities/History';
import { Users } from 'src/entities/Users';
import { EventsGateway } from 'src/events/events.gateway';
import { Repository } from 'typeorm';

@Injectable()
export class DmsService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Dm) private dmRepository: Repository<Dm>,
    @InjectRepository(Dmcontent) private dmcontentRepository: Repository<Dmcontent>,
    @InjectRepository(History) private historyRepository: Repository<History>,
    private eventsGateway:EventsGateway
  ) { }

  async checkHaveUser(userId1:string, userId2:string) {
    try {
      const user1 = await this.usersRepository.findOne({ where: { userId: userId1 } });
      const user2 = await this.usersRepository.findOne({ where: { userId: userId2 } });
      if (!(user1 && user2))
        throw new NotFoundException('유저 조회 실패');
      return true;
    } catch (error) {
      if (error.errno !== undefined || error.response.statusCode !== 404)
        throw new BadRequestException("DM방 맴버 확인 실패");
      else if (error.response.statusCode === 404)
        throw new NotFoundException(error.response.message);
    }
  }

  async findDmUser(dmId: number, userId: string) {
    try {
        const result = await this.dmcontentRepository.findOne({ where: { dmId } });
      if (!result)
        throw new NotFoundException('존재하지 않는 DM방입니다.');
      if (result.userId1 === userId)
        return result.userId2
      else if (result.userId2 === userId)
        return result.userId1
      else
        throw new ForbiddenException('내가 속한 DM방이 아닙니다');    
    } catch (error) {
      if (error.errno !== undefined || (error.response.statusCode !== 403 && error.response.statusCode !== 404))
        throw new BadRequestException("상대 유저 찾기 실패");
      else if (error.response.statusCode === 403)
        throw new ForbiddenException(error.response.message);
      else if (error.response.statusCode === 404)
        throw new NotFoundException(error.response.message); 
    }
  }

  async createAndGetDm(userId1:string, userId2:string) {
    try {
      await this.checkHaveUser(userId1, userId2);
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
      await this.dmcontentRepository.save(newDmcontent);
      return (newDm.id);   
    } catch (error) {
      if (error.errno !== undefined || error.response.statusCode !== 404)
        throw new BadRequestException("DM방 생성 및 조회 실패");
      else if (error.response.statusCode === 404)
        throw new NotFoundException(error.response.message);
    }
  }
  
  async getDmListOnlyID(userId: string, type: boolean) {
    try {
      await this.checkHaveUser(userId, userId);
      const checkdm = await this.dmRepository
        .createQueryBuilder('dm')
        .select(['dm.id'])
        .leftJoin("dm.Dmcontents","dc")
        .where('dc.userId1 = :userId AND dc.message = :ms ', { userId, ms: process.env.DB })
        .orWhere('dc.userId2 = :userId AND dc.message = :ms ', { userId, ms: process.env.DB })
        .orderBy('dm.createdAt', 'DESC')
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
      if (error.errno !== undefined || error.response.statusCode !== 404)
        throw new BadRequestException('DM 리스트 조회 실패');
      else if (error.response.statusCode === 404)
        throw new NotFoundException(error.response.message);
    }
  }

  async getDmList(userId: string) {
    try {
      await this.checkHaveUser(userId, userId);
      const checkdm = await this.dmRepository
        .createQueryBuilder('dm')
        .select(['dm.id', 'dc.userId1', 'dc.userId2'],)
        .leftJoin("dm.Dmcontents","dc")
        .where('dc.userId1 = :userId AND dc.message = :ms ', { userId, ms: process.env.DB })
        .orWhere('dc.userId2 = :userId AND dc.message = :ms ', { userId, ms: process.env.DB })
        .orderBy('dm.createdAt', 'DESC')
        .getMany();
      return (checkdm)
    } catch (error) {
      if (error.errno !== undefined || error.response.statusCode !== 404)
        throw new BadRequestException('DM 리스트 조회 실패');
      else if (error.response.statusCode === 404)
        throw new NotFoundException(error.response.message);
    }
  }

  async sendMessage(userId1:string, userId2:string, message:string, match:number, historyId:number) {
    try {
      await this.checkHaveUser(userId1, userId2);
      const dmId =  await this.createAndGetDm(userId1, userId2);
      const send = new Dmcontent();
      send.dmId = dmId;
      send.userId1 = userId1;
      send.userId2 = userId2;
      if (match === 1){
        send.message = "대국신청";
        send.historyId = await this.getHistoryId(userId1, userId2);
      } else {
        send.message = message;
        send.historyId = historyId;
      }
      send.match = match;
      const dm = await this.dmcontentRepository.save(send);
      const data = { dmId, userId1, userId2, message: dm.message, match, historyId, createdAt: dm.createdAt };
      this.eventsGateway.server.to(`dm-${dm.dmId}`).emit('dm', data); 
      return (dm.historyId);
    } catch (error) {
      if (error.errno !== undefined || error.response.statusCode !== 404)
        throw new BadRequestException("메세지 전송 실패");
      else if (error.response.statusCode === 404)
        throw new NotFoundException(error.response.message);
    }
  }

  async sendMessageUserDmId(userId1:string, dmId:number, message:string, match:number, historyId:number) {
    try {
      const result = await this.usersRepository.findOne({where: { userId: userId1}});
      if (!result)
        throw new NotFoundException('유저 정보 없음');
      const userId2 = await this.findDmUser(dmId, userId1);
      const send = new Dmcontent();
      send.dmId = dmId;
      send.userId1 = userId1;
      send.userId2 = userId2;
      if (match === 1){
        send.message = "대국신청";
        send.historyId = await this.getHistoryId(userId1, userId2);
      } else {
        send.message = message;
        send.historyId = historyId;
      }
      send.match = match;
      send.historyId = historyId;
      const dm = await this.dmcontentRepository.save(send);
      const data = { dmId, userId1, userId2, message: dm.message, match, historyId, createdAt: dm.createdAt };
      this.eventsGateway.server.to(`dm-${dm.dmId}`).emit('dm', data);
      return (dm.historyId);
    } catch (error) {
      if (error.errno !== undefined || error.response.statusCode !== 404)
        throw new BadRequestException("메세지 전송 실패");
      else if (error.response.statusCode === 404)
        throw new NotFoundException(error.response.message);
    }
  }

  async getAllMessage(userId1:string, userId2:string) {
    try {
      await this.checkHaveUser(userId1, userId2);
      const result = await this.dmcontentRepository
        .createQueryBuilder()
        .where('userId1 = :userId1 AND userId2 = :userId2', { userId1, userId2 })
        .orWhere('userId1 = :userId2 AND userId2 = :userId1', { userId2, userId1 })
        .orderBy('createdAt', 'DESC')
        .getMany();
      return (result);
    } catch (error) {
      if (error.errno !== undefined || error.response.statusCode !== 404)
        throw new BadRequestException("메세지 조회 실패");
      else if (error.response.statusCode === 404)
        throw new NotFoundException(error.response.message);
    }
  }

  async getAllMessageUseDmId(userId: string, dmId:number) {
    try {
      const result = await this.dmcontentRepository.findOne({ where: { dmId } });
      if (!result)
        throw new NotFoundException('존재하지 않는 DM방입니다.');
      if (result.userId1 !== userId && result.userId2 !== userId)
        throw new ForbiddenException('내가 속한 DM방이 아닙니다');
      const res = await this.dmcontentRepository
        .createQueryBuilder()
        .where('dmId = :dmId', { dmId })
        .orderBy('createdAt', 'DESC')
        .getMany();
      return (res);  
    } catch (error) {
      if (error.errno !== undefined || (error.response.statusCode !== 403 && error.response.statusCode !== 404))
        throw new BadRequestException("메세지 조회 실패");
      else if (error.response.statusCode === 403)
        throw new ForbiddenException(error.response.message);
      else if (error.response.statusCode === 404)
        throw new NotFoundException(error.response.message);
    }
  }

  async get20Message(userId1:string, userId2:string, page:number) {
    try {
      if (page < 1)
        throw {errno: "범위오류"};
      await this.checkHaveUser(userId1, userId2);
      const result = await this.dmcontentRepository
        .createQueryBuilder()
        .where('userId1 = :userId1 AND userId2 = :userId2', { userId1, userId2 })
        .orWhere('userId1 = :userId2 AND userId2 = :userId1', { userId2, userId1 })
        .orderBy('createdAt', 'DESC')
        .take(20)
        .skip(20 * (page - 1))
        .getMany();
      return (result);
    } catch (error) {
      if (error.errno !== undefined || error.response.statusCode !== 404)
        throw new BadRequestException("메세지 조회 실패");
      else if (error.response.statusCode === 404)
        throw new NotFoundException(error.response.message);
    }
  }

  async get20MessageUseDmId(userId: string, dmId:number, page:number) {
    try {
      if (page < 1)
        throw {errno: "범위오류"};
      const result = await this.dmcontentRepository.findOne({ where: { dmId } });
      if (!result)
        throw new NotFoundException('존재하지 않는 DM방입니다.');
      if (result.userId1 !== userId && result.userId2 !== userId)
        throw new ForbiddenException('내가 속한 DM방이 아닙니다');
      const res = await this.dmcontentRepository
        .createQueryBuilder()
        .where('dmId = :dmId', { dmId })
        .orderBy('createdAt', 'DESC')
        .take(20)
        .skip(20 * (page - 1))
        .getMany();
      return {res}; 
    } catch (error) {
      if (error.errno !== undefined || (error.response.statusCode !== 403 && error.response.statusCode !== 404))
        throw new BadRequestException("메세지 조회 실패");
      else if (error.response.statusCode === 403)
        throw new ForbiddenException(error.response.message);
      else if (error.response.statusCode === 404)
        throw new NotFoundException(error.response.message);
    }
  }

  async getHistoryId(userId1: string, userId2: string) {
    const newHistory = new History();
    newHistory.userId1 = userId1;
    newHistory.userId2 = userId2;
    const reseut = await this.historyRepository.save(newHistory);
    return (reseut.id);
  }

  async getDmListNum(userId: string) {
    try {
      await this.checkHaveUser(userId, userId);
      const checkdm = await this.dmRepository
        .createQueryBuilder('dm')
        .innerJoin("dm.Dmcontents","dc")
        .where('dc.userId1 = :userId AND dc.message = :ms ', { userId, ms: process.env.DB })
        .orWhere('dc.userId2 = :userId AND dc.message = :ms ', { userId, ms: process.env.DB })
        .orderBy('dm.createdAt', 'DESC')
        .getCount();
      const user = await this.usersRepository.findOne({userId});
      const star = user.maxStarOfDms;
      if (checkdm / 5 > star && (checkdm / 5 < 6)){
        const now = Date();
        await this.usersRepository.update({userId}, {maxStarOfDms:checkdm / 5, maxStarOfDmsTime:now});
        return {number:checkdm, star:checkdm, time:now};
      }
      return {number:checkdm, star, time:user.maxStarOfDmsTime};
    } catch (error) {
      if (error.errno !== undefined || error.response.statusCode !== 404)
        throw new BadRequestException('DM 방 수 조회 실패');
      else if (error.response.statusCode === 404)
        throw new NotFoundException(error.response.message);
    }
  }
}
