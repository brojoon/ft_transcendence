import { BadRequestException, ForbiddenException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository, Connection } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(Users)
      private usersRepository: Repository<Users>,
      private connection: Connection,
  ) { }

  getUser() {}

  async Join(oauthId: number, username:string, userId: string, email:string) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const user = await queryRunner.manager
      .getRepository(Users)
      .findOne({ where: { email } });
    if (user) {
      throw new ForbiddenException('이미 존재하는 사용자입니다');
    }
    const hashedPassword = await bcrypt.hash(process.env.SECRET, 12);
    try {
      const returned = await queryRunner.manager.getRepository(Users).save({
          oauthId,
          userId,
          username, 
          email,
          password: hashedPassword
      });
      await queryRunner.commitTransaction();
      return true;
    } catch (error){
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
