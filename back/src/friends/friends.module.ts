import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Friend } from 'src/entities/Friend';
import { Block } from 'src/entities/Block';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Friend, Block]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s' },
    }), 
  ],
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
