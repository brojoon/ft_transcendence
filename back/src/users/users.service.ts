import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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
    try {
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
    } catch (error) {
      if (error.errno !== undefined || error.response.statusCode !== 403)
        throw new BadRequestException("임시 아이디 생성 실패");
      else if (error.response.statusCode === 403)
        throw new ForbiddenException(error.response.message);
    }
  }

  //test용
  async deleteUser(userId) {
    try {
      const user =  await this.usersRepository.findOne({ where: { userId } });
      if (user){
        await this.usersRepository.createQueryBuilder()
        .delete()
        .where('userId = :userId', {userId} )
        .execute();
      }      
    } catch (error) {
      throw new BadRequestException('삭제 실패');
    }
  }

  //내 정보 조회
  async userInfo(userId: string) {
    try {
      const result = await this.usersRepository.findOne({
        select: ['userId', 'username', 'email', 'profile'],
        where: { userId },  
      });
      if (!result)
        throw new NotFoundException('유저 정보 없음');
      return(result);      
    } catch (error) {
      if (error.errno !== undefined || error.response.statusCode !== 404)
        throw new BadRequestException("내 정보 조회 실패");
      else if (error.response.statusCode === 404)
        throw new NotFoundException(error.response.message);    
    }
  }

  //가입한 모든 유저 기본 정보 조회
  async allUser() {
    try {
      const result = await this.usersRepository.find({
        select: ['userId', 'username', 'email', 'profile']
      });
      if (!result)
        throw new NotFoundException('유저 정보 없음');
      return(result);      
    } catch (error) {
      if (error.errno !== undefined || error.response.statusCode !== 404)
        throw new BadRequestException("가입한 모든 유저 정보 조회 실패");
      else if (error.response.statusCode === 404)
        throw new NotFoundException(error.response.message);        
    }
  }
  
  // 유저 접속 정보 조회
  async userConnect(userId: string) {
    try {
      const result = await this.connectRepository.findOne({
        select: ['userId', 'state', 'updatedAt'],
        where: { userId },   
      });
      if (!result)
        throw new NotFoundException('유저 정보 없음');
      return(result);      
    } catch (error) {
      if (error.errno !== undefined || error.response.statusCode !== 404)
        throw new BadRequestException("유저 접속 정보 조회 실패");
      else if (error.response.statusCode === 404)
        throw new NotFoundException(error.response.message);     
    }
  }

  // 모든 유저 접속 정보 조회
  async allUserConnectInfo() {
    try {
      const result = await this.connectRepository.find({
        select: ['userId', 'state', 'updatedAt'],
        where: { },   
      });
      if (!result)
        throw new NotFoundException('유저 정보 없음');
      return(result);      
    } catch (error) {
      if (error.errno !== undefined || error.response.statusCode !== 404)
        throw new BadRequestException("모든 유저 접속 정보 조회 실패");
      else if (error.response.statusCode === 404)
        throw new NotFoundException(error.response.message);     
    }
  }

  // 모든 유저 접속 숫자 조회
  async allUserConnectMember() {
    try {
      return ( await this.connectRepository.count({where: { state: true }}) );      
    } catch (error) {
      throw new BadRequestException('접속자 수 조회 실패');
    }
  }
  
  // profile 닉네임 수정
  async updateUsername(userId: string, username: string) {
    try{
      const res = await this.usersRepository.findOne({where: {username}});
      if ( res )
        return (false);
      await this.usersRepository.createQueryBuilder()
          .update()
          .set({ username })
          .where('userId = :userId', {userId})
          .execute()
      return (true);
    } catch (error) {
      throw new BadRequestException('프로필 업데이트 실패');
    }
  }

  //profil url 반환
  async checkProfileUrl(userId: string) {
    try {
      const result = await this.usersRepository.findOne({
        select: ['profile'],
        where: { userId },  
      });
      if (!result)
        throw new NotFoundException('유저 정보 없음');
      return(result.profile);      
    } catch (error) {
      if (error.errno !== undefined || error.response.statusCode !== 404)
        throw new BadRequestException("프로필 URL 조회 실패");
      else if (error.response.statusCode === 404)
        throw new NotFoundException(error.response.message);        
    }
  }

  // 프로필 이미지 업로드 
  async uploadPofileImage(userId:string ,file: Express.Multer.File) {
    try{
      const myProfile = `${process.env.URI}${file.path}`
      await this.usersRepository.createQueryBuilder()
          .update()
          .set({ profile: myProfile})
          .where('userId = :userId', {userId})
          .execute()
      return (true);
    } catch (error) {
      throw new BadRequestException('프로필 업데이트 실패');
    }   
  }

  // two-factor 상태확인
  async twoFactorStatus(userId: string) {
    try {
      const result = await this.usersRepository.findOne({
        select: ['twofactorEnable'],
        where: { userId },  
      });
      if (!result)
        throw new NotFoundException('유저 정보 없음');
      return(result.twofactorEnable);      
    } catch (error) {
      if (error.errno !== undefined || error.response.statusCode !== 404)
        throw new BadRequestException("two-factor 상태확인 실패");
      else if (error.response.statusCode === 404)
        throw new NotFoundException(error.response.message);       
    }
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
      return (true);    
    } catch (error) {
      throw new BadRequestException('two-factor 스위치 실패');
    } 
  }
}
