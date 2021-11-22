import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Friend } from 'src/entities/Friend';
import { Block } from 'src/entities/Block';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Friend, Block]),
    EventsModule
  ],
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
