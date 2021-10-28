import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'common/interceptors/undefinedToNull.interceptor';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChannelsService } from './channels.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('ts_token')
@ApiTags('CHANNEL') // API문서 카테고리
@UseInterceptors(UndefinedToNullInterceptor) // 마지막 리턴값 undifined일경우 null로 바꿈
@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}


}
