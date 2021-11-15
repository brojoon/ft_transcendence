import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UseFilters, HttpException, Catch, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'common/decorators/user.decorator';
import { UndefinedToNullInterceptor } from 'common/interceptors/undefinedToNull.interceptor';
import { Channel, channel } from 'diagnostics_channel';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { ChannelsService } from './channels.service';
import { ChannelDto } from './dto/channel.dto';
import { ChannelStringDto } from './dto/chnnelString.dto';
import { AllExceptionsFilter } from './exceptionfilter/exception.filter';
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('ts_token')
@ApiTags('CHANNEL') // API문서 카테고리
@UseInterceptors(UndefinedToNullInterceptor) // 마지막 리턴값 undifined일경우 null로 바꿈
@Controller('api/channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Get("allChannelList")
  async allChannelList() {
    return await this.channelsService.allChannelList();
  }

  @Get('/myChannelList')
  async myChannelList(@User() user){
    return await this.channelsService.myChannelList(user.userId);
  }
  
  @Get('/myChannelListOnlyId')
  async myChannelListOnlyId(@User() user){
    return await this.channelsService.myChannelListOnlyId(user.userId);
  }
  @Post('/create/:channelName/:type')
  @ApiResponse ({
    status: 200,
    description: '성공',
    type: ChannelDto,
  })
  @ApiOperation({summary:"채팅방 생성", description:"type 0이면 public방, type 1이면 protected방, type 2이면 private방"})
  async makeChannel(@Param("channelName") channelName:string,@User() user,@Param('type') type:number, @Body() dto:ChannelDto){
      return await this.channelsService.makeChannel(user.userId, channelName, type, dto.password);//비번 입력해도 비번방 설정이 안됨
  }
  @Post('/join/:channelId')
  @ApiResponse ({//스웨거 body칸 있게 하려면
    status: 200,
    description: '성공',
    type: ChannelDto,
  })
  @ApiOperation({summary:"채팅방 참여", description:"0번방(public)방에 참여할지라도 형식적으로라도 비밀번호에 값을 넣어서\
  요청메시지를 보내주세요."})
  async joinChannel(@Param("channelId") channelId:number, @User() user, @Body() dto:ChannelDto){
    return await this.channelsService.joinChannel(channelId, user.userId, dto.password);
  }

  @Get('/getout/:channelId')
  async getOutChnnel(@Param("channelId") channelId:number, @User() user){
    return await this.channelsService.getOutChnnel(channelId, user.userId)
  }

  @Get('/invite/:channelId/:visitor')
  @ApiOperation({summary:"소유자나 관리자가 유저를 채팅방에 초대", description:"유저를 초대하면 그 유저는 자동으로(강제로)\
  채팅방에 참여하게 됩니다."})
  async inviteChannel(@Param("channelId") channelId:number, @User() admin, @Param("visitor") visitor:string){
    return await this.channelsService.inviteChannel(channelId, admin.userId, visitor);
  }

  @ApiOperation({summary:"메시지를 보냅니다", description:"만약 mute인 사용자가 메시지를 보내려고 하면 메시지는 db에\
  저장이 안되고 403에러가 응답으로 갑니다."})
  @Post('/send/:channelId')//ban된 상태인데 메시지 보내려고 할때 처리해줄것 
  async sendMessage(@Param("channelId") channelId:number, @User() user, @Body() dto:ChannelStringDto){
    await this.channelsService.sendMessage(channelId, user.userId, dto.msg);
  }

  @Get('/allMessageList/:channelId')
  async getAllMessage(@Param("channelId") channelId:number, @User() user){
    return await this.channelsService.getAllMessage(channelId, user.userId);
  }

  @Get('/20MessageList/:channelId/:skip')
  @ApiOperation({summary:"20의 메시지를 받아옵니다", description:"프론트엔드가 지금까지 받은 메시지의 개수를 skip 파라미터에\
  입력합니다. 10을 입력하면 11~30번째의 메시지들을 받을수 있습니다. 반환형은 객체인데, list프로퍼티에는 메시지들이 배열형태로 존재합니다.\
  그리고 TotalMessageNumber 프로퍼티의에는  현재 채널방의 총 메시지 개수가 들어있습니다."})
  async Message20List(@Param("channelId") channelId:number, @Param("skip") skip:number, @User() user){
    console.log("skip is:", skip);
    return await this.channelsService.get20Message(channelId, user.userId, skip);
  }

  @Get('/userList/:channelId')
  async userList(@Param("channelId") channelId:number, @User() user){
    return await this.channelsService.userList(channelId, user.userId);
  }

  @Get("/checkMyMute/:channelId")
  async checkMuteState(@Param("channelId") channelId:number, @User() user){
    return await this.channelsService.checkMuteState(channelId, user.userId);
  }

  @Get('/mutedMembers/:channelId')
  @ApiOperation({summary:"한 채널에 mute된 멤버들을 조회"})
  async mutedMembers(@Param("channelId") channelId, @User() user){
    return await this.channelsService.mutedMembers(channelId, user.userId);
  }

  @Get("/checkOtherMute/:channelId/:userId")
  async checkOtherMute(@Param("channelId") channelId:number, @Param("userId") userId){
    return await this.channelsService.checkMuteState(channelId, userId);
  }

  @Get("/checkBan/:channelId")
  async checkBanState(@Param("channelId") channelId:number, @User() user){
    return await this.channelsService.checkBanState(channelId, user.userId);
  }

  @Get("/checkOwner/:channelId")
  async checkOwnerState(@Param("channelId") channelId:number, @User() user){
    return await this.channelsService.checkOwner(channelId, user.userId);
  }

  @Get("/checkAdmin/:channelId")
  async checkAdminState(@Param("channelId") channelId:number, @User() user){
    return await this.channelsService.checkAdmin(channelId, user.userId);
  }

  @Get("/giveAdmin/:channelId/:gievenUser")
  async giveAdmin(@Param("channelId") channelId:number, @User() owner, @Param('gievenUser') givenUser:string){
    await this.channelsService.giveAdmin(channelId, owner.userId, givenUser);
  }

  @Get("/banUser/:channelId/:banId/")
  async banUser(@Param("channelId") channelId:number, @User() admin, @Param("banId") banId:string){
    await this.channelsService.banUser(channelId, admin.userId, banId);
  }

  @Get("/changeChannelType/:channelId/:type")//await 빠진 부분 다 붙이기, 컨트롤러 함수들 다 async 해주기
  async updateType(@Param("channelId") channelId:number, @User() user, @Param('type') type:number){
    return await this.channelsService.updateType(channelId, user.userId, type);
  }

  @Get("/changeChannelName/:channelId/:channelName")
  async updateChannelName(@Param("channelId") channelId:number, @User() user, @Param('channelName') channelName:string){
    return await this.channelsService.updateChannelName(channelId, user.userId, channelName);
  }

  @Get("/changeChannelPassword/:channelId/:pasword")
  @ApiResponse ({//스웨거 body칸 있게 하려면
    status: 200,
    description: '성공',
    type: ChannelDto,
  })
  async updateChannelPassword(@Param("channelId") channelId:number, @User() user, @Body() dto:ChannelDto){
    await this.channelsService.updateChannelPassword(channelId, user.userId, dto.password);
  }

  @Get("/muteUser/:channelId/:muteId/:time")
  async muteSwitch(@Param("channelId") channelId:number, @User() admin, @Param('muteId') muteId:string, @Param("time") time:number){
    await this.channelsService.muteSwitch(channelId, admin.userId, muteId, time);
  }
  @Get("/deleteChannel/:channelId")
  async deleteChannel(@Param("channelId") channelId:number, @User() owner){
    console.log("test\n",owner,"\ntest");
    await this.channelsService.deleteChannel(channelId, owner.userId);
  }

  @Get("/achevement/numOfChannels")
  async achievementChannelNumber(@User() user) :Promise<number>{
    return await this.channelsService.achievementChannelNumber(user.userId);
  }
}
