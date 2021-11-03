import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UseFilters, HttpException, Catch } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'common/decorators/user.decorator';
import { UndefinedToNullInterceptor } from 'common/interceptors/undefinedToNull.interceptor';
import { Channel, channel } from 'diagnostics_channel';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { ChannelsService } from './channels.service';
import { ChannelDto } from './dto/channel.dto';
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('ts_token')
@ApiTags('CHANNEL') // API문서 카테고리
@UseInterceptors(UndefinedToNullInterceptor) // 마지막 리턴값 undifined일경우 null로 바꿈
@UseFilters(HttpExceptionFilter)
@Controller('api/channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Get("allChannelList")
  async allChannelList() {
    return this.channelsService.allChannelList();
  }

  @Get('/myChannelList')
  async myChannelList(@User() user){
    return this.channelsService.myChannelList(user.userId);
  }

  @Post('/create/:channelName/:type')
  @ApiResponse ({//스웨거 body칸 있게 하려면
    status: 200,
    description: '성공',
    type: ChannelDto,
  })
  async makeChannel(@Param("channelName") channelName:string,@User() user,@Param('type') type:number, @Body() dto:ChannelDto){
      this.channelsService.makeChannel(user.userId, channelName, type, dto.password);//비번 입력해도 비번방 설정이 안됨
  }
  @Post('/join/:channelId')
  @ApiResponse ({//스웨거 body칸 있게 하려면
    status: 200,
    description: '성공',
    type: ChannelDto,
  })
  async joinChannel(@Param("channelId") channelId:number, @User() user, @Body() dto:ChannelDto){
    this.channelsService.joinChannel(channelId, user.userId, dto.password);
  }

  @Get('/getout/:channelId')
  async getOutChnnel(@Param("channelId") channelId:number, @User() user){
    this.channelsService.getOutChnnel(channelId, user.userId)
  }

  @Get('/invite/:channelId/:visitor')
  async inviteChannel(@Param("channelId") channelId:number, @User() admin, @Param("visitor") visitor:string){
    this.channelsService.inviteChannel(channelId, admin.userId, visitor);
  }

  @Post('/send/:channelId')//ban된 상태인데 메시지 보내려고 할때 처리해줄것 
  async sendMessage(@Param("channelId") channelId:number, @User() user, @Body('msg') msg:string){
    this.channelsService.sendMessage(channelId, user.userId, msg);
  }

  @Get('/messageList/:channelId')
  async getAllMessage(@Param("channelId") channelId:number, @User() user){
    return this.channelsService.getAllMessage(channelId, user.userId);
  }

  @Get('/userList/:channelId')
  async userList(@Param("channelId") channelId:number, @User() user){//이거 잘 작동 안함.
    return this.channelsService.userList(channelId, user.userId);
  }

  @Get("/checkMute/:channelId")
  async checkMuteState(@Param("channelId") channelId:number, @User() user){
    return this.channelsService.checkMuteState(channelId, user.userId);
  }

  @Get("/checkBan/:channelId")
  async checkBanState(@Param("channelId") channelId:number, @User() user){
    return this.channelsService.checkBanState(channelId, user.userId);
  }

  @Get("/checkOwner/:channelId")
  async checkOwnerState(@Param("channelId") channelId:number, @User() user){
    return this.channelsService.checkOwner(channelId, user.userId);
  }

  @Get("/checkAdmin/:channelId")
  async checkAdminState(@Param("channelId") channelId:number, @User() user){
    return this.channelsService.checkAdmin(channelId, user.userId);
  }

  @Get("/giveAdmin/:channelId/:gievenUser")
  async giveAdmin(@Param("channelId") channelId:number, @User() owner, @Param('gievenUser') givenUser:string){
    this.channelsService.giveAdmin(channelId, owner.userId, givenUser);
  }

  @Get("/banUser/:channelId/:banId/")
  async banUser(@Param("channelId") channelId:number, @User() admin, @Param("banId") banId:string){
    this.channelsService.banUser(channelId, admin.userId, banId);
  }

  @Get("/changeChannelType/:channelId/:type")//await 빠진 부분 다 붙이기, 컨트롤러 함수들 다 async 해주기
  async updateType(@Param("channelId") channelId:number, @User() user, @Param('type') type:number){
    this.channelsService.updateType(channelId, user.userId, type);
  }

  @Get("/changeChannelName/:channelId/:channelName")
  async updateChannelName(@Param("channelId") channelId:number, @User() user, @Param('channelName') channelName:string){
    this.channelsService.updateChannelName(channelId, user.userId, channelName);
  }

  @Get("/changeChannelPassword/:channelId/:pasword")
  @ApiResponse ({//스웨거 body칸 있게 하려면
    status: 200,
    description: '성공',
    type: ChannelDto,
  })
  async updateChannelPassword(@Param("channelId") channelId:number, @User() user, @Body() dto:ChannelDto){
    this.channelsService.updateChannelPassword(channelId, user.userId, dto.password);
  }

  @Get("/muteUser/:channelId/:muteId/:time")
  async muteSwitch(@Param("channelId") channelId:number, @User() admin, @Param('muteId') muteId:string, @Param("time") time:number){
    this.channelsService.muteSwitch(channelId, admin.userId, muteId, time);
  }

  @Get("/deleteChannel/:channelId")
  async deleteChannel(@Param("channelId") channelId:number, @User() owner){//채널이 안지워짐
    console.log("test\n",owner,"\ntest");
    this.channelsService.deleteChannel(channelId, owner.userId);
  }
}
