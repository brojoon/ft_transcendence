import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import { Connect } from 'src/entities/Connect';

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(Users) private usersRepository: Repository<Users>,
      @InjectRepository(Connect) private connectRepository: Repository<Connect>,
  ) { }

  //test용
  async inputUser(oauthId, username, userId, email) {
    const user =  await this.usersRepository.findOne({ where: { oauthId } });
    if (user)
      throw new ForbiddenException('이미 존재하는 사용자입니다');
    const newUser = new Users();
    newUser.oauthId = oauthId;
    newUser.userId = userId;
    newUser.username = userId;
    newUser.email = `${email}@naver.com`;
    newUser.profile = "aaaa";
    newUser.password = "aaaa";
    await this.usersRepository.save(newUser);
    const connect = new Connect();
    connect.userId = userId;
    connect.state = true;
    await this.connectRepository.save(connect);
    return (true);
  }

  //test용
  async deleteUser(userId) {
    const user =  await this.usersRepository.findOne({ where: { userId } });
    if (user){
      await this.usersRepository.createQueryBuilder()
      .delete()
      .where('userId = :userId', {userId} )
      .execute();
    }
  }

  //내 정보 조회
  async userInfo(userId: string) {
    const result = await this.usersRepository.findOne({
      select: ['userId', 'username', 'email', 'profile'],
      where: { userId },  
    });
    if (!result)
      throw new ForbiddenException('유저 정보 없음');
    return(result);
  }

  //가입한 모든 유저 기본 정보 조회
  async allUser() {
    const result = await this.usersRepository.find({
      select: ['userId', 'username', 'email', 'profile'],
      where: {},  
    });
    if (!result)
      throw new ForbiddenException('유저 정보 없음');
    return(result);
  }
  
  // 유저 접속 정보 조회
  async userConnect(userId: string) {
    const result = await this.connectRepository.findOne({
      select: ['userId', 'state', 'updatedAt'],
      where: { userId },   
    });
    if (!result)
      throw new ForbiddenException('유저 정보 없음');
    return(result);
  }

  // 모든 유저 접속 정보 조회
  async allUserConnectInfo() {
    const result = await this.connectRepository.find({
      select: ['userId', 'state', 'updatedAt'],
      where: { },   
    });
    if (!result)
      throw new ForbiddenException('유저 정보 없음');
    return(result);
  }

  // 모든 유저 접속 정보 조회
  async allUserConnectMember() {
    const result = await this.connectRepository.count({
      where: { state: true },
    });
    //if (!result)
    //  throw new ForbiddenException('유저 정보 없음');
    return(result);
  }
  
  // profil 수정
  async updateProfile(userId: string, profile: string) {
    try{
      await this.usersRepository.createQueryBuilder()
          .update()
          .set({ profile })
          .where('userId = :userId', {userId})
          .execute()
    }catch{
      throw new ForbiddenException('프로필 업데이트 실패');
    }
    return (true);
  }

  // profil 수정
  async updateUsername(userId: string, username: string) {
    const result = await this.connectRepository.findOne({ where: { username } });
    if (result)
      return (false);
    try{
      await this.usersRepository.createQueryBuilder()
          .update()
          .set({ username })
          .where('userId = :userId', {userId})
          .execute()
    }catch{
      throw new ForbiddenException('프로필 업데이트 실패');
    }
    return (true);
  }

  //profil url 반환
  async checkProfileUrl(userId: string) {
    const result = await this.usersRepository.findOne({
      select: ['profile'],
      where: { userId },  
    });
    if (!result)
      throw new ForbiddenException('유저 정보 없음');
    return(result.profile);
  }

  // two-factor 상태확인
  async twoFactorStatus(userId: string) {
    const result = await this.usersRepository.findOne({
      select: ['twofactorEnable'],
      where: { userId },  
    });
    if (!result)
      throw new ForbiddenException('유저 정보 없음');
    return(result.twofactorEnable);
  }

  // two-factor 스위치
  async twoFactorSwitch(userId: string, twofactorEnable: boolean) {
    try{
      await this.usersRepository.createQueryBuilder()
          .update()
          .set({
            twofactorEnable: twofactorEnable,
          })
          .where('userId = :userId', {userId})
          .execute()
    }catch{
      throw new ForbiddenException('유정 정보 업데이트 실패');
    }
    return (true);
  }
}
