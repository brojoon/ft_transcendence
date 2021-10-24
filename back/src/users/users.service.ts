import { BadRequestException, ForbiddenException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository, Connection } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
      private connection: Connection,
  ) { }

  async TwoFactorSwitch(userId: string, twofactorEnable: boolean) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .getRepository(Users)
        .update(
          {userId},
          {twofactorEnable}
        );
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
