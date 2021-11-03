import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'common/decorators/user.decorator';
import { UndefinedToNullInterceptor } from 'common/interceptors/undefinedToNull.interceptor';
import { Channel, channel } from 'diagnostics_channel';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChannelsService } from './channels.service';
import { ChannelDto } from './dto/channel.dto';
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

  @Get('/channelList')
  myChannelList(@User() user){
    return this.channelsService.myChannelList(user.userId);
  }

  @Post('/create/:channelName/:type')
  @ApiResponse ({//스웨거 body칸 있게 하려면
    status: 200,
    description: '성공',
    type: ChannelDto,
  })
  makeChannel(@Param("channelName") channelName:string,@User() user,@Param('type') type:number, @Body() dto:ChannelDto){
      this.channelsService.makeChannel(user.userId, channelName, type, dto.password);
  }
  @Post('/join/:channelId')
  @ApiResponse ({//스웨거 body칸 있게 하려면
    status: 200,
    description: '성공',
    type: ChannelDto,
  })
  joinChannel(@Param("channelId") channelId:number, @User() user, @Body() dto:ChannelDto){
    this.channelsService.joinChannel(channelId, user.userId, dto.password);
  }

  @Get('/getout/:channelId')
  getOutChnnel(@Param("channelId") channelId:number, @User() user){
    this.channelsService.getOutChnnel(channelId, user.userId)
  }

  @Get('/invite/:channelId/:visitor')
  inviteChannel(@Param("channelId") channelId:number, @User() admin, @Param("visitor") visitor:string){
    this.channelsService.inviteChannel(channelId, admin.userId, visitor);
  }

  @Post('/send/:channelId')
  sendMessage(@Param("channelId") channelId:number, @User() user, @Body('msg') msg:string){
    this.channelsService.sendMessage(channelId, user.userId, msg);
  }

  @Get('/messages/:channelId')
  getAllMessage(@Param("channelId") channelId:number){
    return this.channelsService.getAllMessage(channelId);
  }

  @Get('/userList/:channelId')
  userList(@Param("channelId") channelId:number){
    return this.channelsService.userList(channelId);
  }

  @Get("/checkMute/:channelId")
  checkMuteState(@Param("channelId") channelId:number, @User() user){
    return this.channelsService.checkMuteState(channelId, user.userId);
  }

  @Get("/checkBan/:channelId")
  checkBanState(@Param("channelId") channelId:number, @User() user){
    return this.channelsService.checkBanState(channelId, user.userId);
  }

  @Get("/checkOwner/:channelId")
  checkOwnerState(@Param("channelId") channelId:number, @User() user){
    return this.channelsService.checkOwner(channelId, user.userId);
  }

  @Get("/checkAdmin/:channelId")
  checkAdminState(@Param("channelId") channelId:number, @User() user){
    return this.channelsService.checkAdmin(channelId, user.userId);
  }

  @Get("/giveAdmin/:channelId/:gievenUser")
  giveAdmin(@Param("channelId") channelId:number, @User() owner, @Param('gievenUser') givenUser){
    this.channelsService.giveAdmin(channelId, owner.userId, givenUser);
  }

  @Get("/banUser/:channelId/:banId/")
  banUser(@Param("channelId") channelId:number, @User() admin, @Param("banId") banId:string){
    this.channelsService.banUser(channelId, admin.userId, banId);
  }

  @Get("/changeChannelType/:channelId/:type")
  updateType(@Param("channelId") channelId:number, @User() user, @Param('type') type:number){
    this.channelsService.updateType(channelId, user.userId, type);
  }

  @Get("/changeChannelName/:channelId/:channelName")
  updateChannelName(@Param("channelId") channelId:number, @User() user, @Param('channelName') channelName:string){
    this.channelsService.updateChannelName(channelId, user.userId, channelName);
  }

  @Get("/changeChannelPassword/:channelId/:pasword")
  @ApiResponse ({//스웨거 body칸 있게 하려면
    status: 200,
    description: '성공',
    type: ChannelDto,
  })
  updateChannelPassword(@Param("channelId") channelId:number, @User() user, @Body() dto:ChannelDto){
    this.channelsService.updateChannelPassword(channelId, user.userId, dto.password);
  }

  @Get("/muteUser/:channelId/:muteId/:time")
  muteSwitch(@Param("channelId") channelId:number, @User() admin, @Param('muteId') muteId:string, @Param("time") time:number){
    this.channelsService.muteSwitch(channelId, admin.userId, muteId, time);
  }

  @Get("/deleteChannel/:channelId")
  deleteChannel(@Param("channelId") channelId:number, @User() owner){
    this.deleteChannel(channelId, owner.userId);
  }
}
