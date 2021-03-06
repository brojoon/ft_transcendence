import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Chatchannel } from 'src/entities/Chatchannel';
import { Chatmember } from 'src/entities/Chatmember';
import { Chatcontent } from 'src/entities/Chatcontent';
import { EventsModule } from 'src/events/events.module';
import { Blockmember } from 'src/entities/Blockmember';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Chatchannel,
      Chatmember,
      Chatcontent,
      Blockmember
    ]),
    EventsModule,
  ],
  controllers: [ChannelsController],
  providers: [ChannelsService]
})
export class ChannelsModule {}
