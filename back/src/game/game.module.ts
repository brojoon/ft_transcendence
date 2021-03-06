import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from 'src/entities/History';
import { EventsModule } from 'src/events/events.module';
import { Dmcontent } from 'src/entities/Dmcontent';
import { Users } from 'src/entities/Users';

@Module({
  imports: [
    TypeOrmModule.forFeature([History, Dmcontent, Users]),
    EventsModule,
  ],
  controllers: [GameController],
  providers: [GameService]
})
export class GameModule {}
