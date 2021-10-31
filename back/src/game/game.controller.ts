import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService
  ) {}

  @Get()
  getHello() {
    return this.gameService.getHello();
  }

}
