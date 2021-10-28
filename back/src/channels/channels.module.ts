import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Chatchannel } from 'src/entities/Chatchannel';
import { Chatmember } from 'src/entities/Chatmember';
import { Chatcontent } from 'src/entities/Chatcontent';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Chatchannel,
      Chatmember,
      Chatcontent
    ]),
  ],
  controllers: [ChannelsController],
  providers: [ChannelsService]
})
export class ChannelsModule {}
