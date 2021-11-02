import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'common/interceptors/undefinedToNull.interceptor';
import { Channel, channel } from 'diagnostics_channel';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChannelsService } from './channels.service';
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('ts_token')
@ApiTags('CHANNEL') // API문서 카테고리
@UseInterceptors(UndefinedToNullInterceptor) // 마지막 리턴값 undifined일경우 null로 바꿈
@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Get()
  allChannelList() {
    return this.channelsService.allChannelList();
  }

  @Get('/channelList/:userId')
  myChannelList(@Param('userId') userId:string){
    return this.channelsService.myChannelList(userId);
  }

  @Post('/create/:userId/:channelName/:type')
  makeChannel(@Param("channelName") channelName:string, @Param("userId") userId:string,@Param('type') type:number, @Body('password') password:string){
      this.channelsService.makeChannel(userId, channelName, type, password);
  }
  @Post('/join/:channelId/:userId')
  joinChannel(@Param("channelId") channelId:number, @Param("userId") userId:string, @Body('password') password:string){
    this.channelsService.joinChannel(channelId, userId, password);
  }

  @Get('/getout/:channelId/:userId')
  getOutChnnel(@Param("channelId") channelId:number, @Param("userId") userId:string){
    this.channelsService.getOutChnnel(channelId, userId)
  }

  @Get('/invite/:channelId/:adminId/:visitor')
  inviteChannel(@Param("channelId") channelId:number, @Param("adminId") adminId:string, @Param("visitor") visitor:string){
    this.channelsService.inviteChannel(channelId, adminId, visitor);
  }

  @Post('/send/:channelId/:userId')
  sendMessage(@Param("channelId") channelId:number, @Param("userId") userId:string, @Body('msg') msg:string){
    this.channelsService.sendMessage(channelId, userId, msg);
  }

  @Get('/messages/:channelId')
  getAllMessage(@Param("channelId") channelId:number){
    return this.channelsService.getAllMessage(channelId);
  }

  @Get('/userList/:channelId')
  userList(@Param("channelId") channelId:number){
    return this.channelsService.userList(channelId);
  }

  @Get("/checkMute/:channelId/:userId")
  checkMuteState(@Param("channelId") channelId:number, @Param("userId") userId:string){
    return this.channelsService.checkMuteState(channelId, userId);
  }

  @Get("/checkBan/:channelId/:userId")
  checkBanState(@Param("channelId") channelId:number, @Param("userId") userId:string){
    return this.channelsService.checkBanState(channelId, userId);
  }

  @Get("/checkOwner/:channelId/:userId")
  checkOwnerState(@Param("channelId") channelId:number, @Param("userId") userId:string){
    return this.channelsService.checkOwner(channelId, userId);
  }

  @Get("/checkAdmin/:channelId/:userId")
  checkAdminState(@Param("channelId") channelId:number, @Param("userId") userId:string){
    return this.channelsService.checkAdmin(channelId, userId);
  }

  @Get("/giveAdmin/:channelId/:userId")
  giveAdmin(@Param("channelId") channelId:number, @Param("userId") userId:string){
    this.channelsService.giveAdmin(channelId, userId);
  }

  @Get("/banUser/:channelId/:adminId/:banId/")
  banUser(@Param("channelId") channelId:number, @Param("adminId") adminId:string, @Param("banId") banId:string){
    this.channelsService.banUser(channelId, adminId, banId);
  }

  @Get("/changeChannelType/:channelId/:userId/:type")
  updateType(@Param("channelId") channelId:number, @Param("userId") userId:string, @Param('type') type:number){
    this.channelsService.updateType(channelId, userId, type);
  }

  @Get("/changeChannelType/:channelId/:userId/:channelName")
  updateChannelName(@Param("channelId") channelId:number, @Param("userId") userId:string, @Param('channelName') channelName:string){
    this.channelsService.updateChannelName(channelId, userId, channelName);
  }

  @Get("/changeChannelType/:channelId/:userId/:pasword")
  updateChannelPassword(@Param("channelId") channelId:number, @Param("userId") userId:string, @Param('password') password:string){
    this.channelsService.updateChannelPassword(channelId, userId, password);
  }

  @Get("/muteUser/:channelId/:adminId/:muteId/:time")
  muteSwitch(@Param("channelId") channelId:number, @Param("userId") userId:string, @Param('muteId') muteId:string, @Param("time") time:number){
    this.channelsService.muteSwitch(channelId, userId, muteId, time);
  }

  @Get("/deleteChannel/:channelId/:ownerId")
  deleteChannel(@Param("channelId") channelId:number, @Param("ownerId") ownerId:string){
    this.deleteChannel(channelId, ownerId);
  }
}
