import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from 'src/entities/History';

@Module({
  imports: [
    TypeOrmModule.forFeature([History]),
  ],
  controllers: [GameController],
  providers: [GameService]
})
export class GameModule {}
