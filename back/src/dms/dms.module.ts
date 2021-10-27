import { Module } from '@nestjs/common';
import { DmsService } from './dms.service';
import { DmsController } from './dms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Dmcontent } from 'src/entities/Dmcontent';
import { Dm } from 'src/entities/Dm';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Dm, Dmcontent]),
    EventsModule
  ],
  controllers: [DmsController],
  providers: [DmsService]
})
export class DmsModule {}
