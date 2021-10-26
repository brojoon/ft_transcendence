import { BadRequestException, ForbiddenException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository, Connection } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { connect } from 'http2';
import { Connect } from 'src/entities/Connect';

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(Users) private usersRepository: Repository<Users>,
      @InjectRepository(Connect) private connectRepository: Repository<Connect>,
  ) { }

  //유저 기본 정보 조회
  async userInfo(userId: string) {
    const result = await this.usersRepository.findOne({
      where: { userId },
      select: ['userId', 'username', 'email', 'profile'],
    });
    if (!result)
      throw new ForbiddenException('유저 정보 없음');
    return(result);
  }
  
  // 유저 접속 정보 조회
  async userConnect(userId: string) {
    const result = await this.connectRepository.findOne({
      where: { userId },
      select: ['userId', 'state', 'updatedAt'],
    });
    if (!result)
      throw new ForbiddenException('유저 정보 없음');
    return(result);
  }

  // 모든 유저 정보 조회
  async allUserConnectInfo() {
    const result = await this.connectRepository.find({
      where: { },
      select: ['userId', 'state', 'updatedAt'],
    });
    if (!result)
      throw new ForbiddenException('유저 정보 없음');
    return(result);
  }

  // two-factor 상태확인
  async twoFactorStatus(userId: string) {
    const result = await this.usersRepository.findOne({
      where: { userId },
      select: ['twofactorEnable'],
    });
    if (result)
      throw new ForbiddenException('이미 존재하는 사용자입니다');
    return(result.twofactorEnable);
  }

  // two-factor 스위치
  async twoFactorSwitch(userId: string, twofactorEnable: boolean) {
    try{
      await this.usersRepository.createQueryBuilder()
          .update()
          .set({
            twofactorEnable: () => `${twofactorEnable}`,
          })
          .where('userId = :userId', {userId})
          .execute()
    }catch{
      throw new ForbiddenException('유정 정보 업데이트 실패');
    }
  }
}
