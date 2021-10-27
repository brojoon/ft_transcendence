import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseInterceptors, UseGuards, HttpCode } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'common/decorators/user.decorator';
import { UserDto } from 'common/dto/user.dto';
import { UndefinedToNullInterceptor } from 'common/interceptors/undefinedToNull.interceptor';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserInfoDto } from './dto/userInfo.dto';
import { UserConnetInfo } from './dto/userConnetInfo.dto';
import { ProfileUrl } from './dto/profileUrl.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('ts_token')
@ApiTags('USERS') // API문서 카테고리
@UseInterceptors(UndefinedToNullInterceptor) // 마지막 리턴값 undifined일경우 null로 바꿈
@Controller('api/users') // uri시작부분
export class UsersController {
  constructor(
      private readonly usersService: UsersService
    ) {}


  @ApiOperation({ summary: 'test용 user 정보 넣어보기'})
  @ApiResponse ({
    status: 200,
    description: '성공',
    type: UserDto,
  })
  @HttpCode(200)
  @Get('intput/:oauthId/:username/:userId/:email')
  inputUser(
    @Param('oauthId') oauthId: string,
    @Param('username') username: string,
    @Param('userId') userId: string,
    @Param('email') email: string,
  ) {
    return this.usersService.inputUser(oauthId, username, userId, email);
  }
  @ApiOperation({ summary: 'test용 user 정보 넣어보기'})
  @ApiResponse ({
    status: 200,
    description: '성공',
    type: UserDto,
  })

  @ApiOperation({ summary: 'test용 user 정보 넣어보기'})
  @ApiResponse ({
    status: 200,
    description: '성공',
    type: String,
  })
  @HttpCode(200)
  @Get('deleteuser/:userId/')
  deleteUser(@Param('userId') userId:string) {
    return this.usersService.deleteUser(userId);
  }

  @ApiOperation({ summary: '내정보 조회'})
  @ApiResponse ({
    status: 200,
    description: '성공',
    type: UserDto,
  })
  @HttpCode(200)
  @Get()
  getUser(@User() user) {
    return this.usersService.userInfo(user.userId);
  }

  @ApiOperation({ summary: '가입한 모든 유저 정보 조회'})
  @ApiResponse ({
    status: 200,
    description: '성공',
    type: UserDto,
  })
  @HttpCode(200)
  @Get('alluser')
  allUser() {
    return this.usersService.allUser();
  }

  @ApiOperation({ summary: '유저 정보 조회'})
  @ApiResponse ({
    status: 200,
    description: '',
    type: UserInfoDto
  })
  @HttpCode(200)
  @Get('info/:id')
  userInfo(@Param('id') param: string) {
    return this.usersService.userInfo(param);
  }

  @ApiOperation({ summary: '유저 접속 정보 조회'})
  @ApiResponse ({
    status: 200,
    description: '',
    type: UserConnetInfo
  })
  @HttpCode(200)
  @Get('connect/:id')
  userConnect(@Param('id') param: string) {
    return this.usersService.userConnect(param);
  }

  @ApiOperation({ summary: '모든 접속중인 정보 조회'})
  @ApiResponse ({
    status: 200,
    type: UserConnetInfo
  })
  @HttpCode(200)
  @Get('connect-all')
  allUserConnectInfo() {
    return this.usersService.allUserConnectInfo();
  }
  
  @ApiOperation({ summary: '접속자 수'})
  @ApiResponse ({
    status: 200,
    type: Number
  })
  @HttpCode(200)
  @Get('connect-member')
  allUserConnectMember() {
    return this.usersService.allUserConnectMember();
  }

  @ApiOperation({ summary: '프로필 수정'})
  @ApiResponse ({
    status: 201,
    description: '성공시 true',
    type: Boolean
  })
  @HttpCode(201)
  @Post('update-profile')
  async updateProfile(@Body() body: ProfileUrl) {
    return this.usersService.updateProfile(body.userId, body.profile);
  }

  @ApiOperation({ summary: '유저 프로필 URL 반환'})
  @ApiResponse ({
    status: 200,
    description: 'url',
    type: String
  })
  @HttpCode(200)
  @Get('profile/:id')
  async checkProfileUrl(@Param('id') id: string){
    return  this.usersService.checkProfileUrl(id);
  }

  @ApiOperation({ summary: '이차 인증 켜짐'})
  @ApiResponse ({
    status: 200,
    description: '성공시 true',
    type: Boolean
  })
  @HttpCode(200)
  @Get('turn-on')
  async twoFactorSwitchOn(@User() user) {
    return this.usersService.twoFactorSwitch(user.userId, true);
  }

  @ApiOperation({ summary: '이차 인증 꺼짐'})
  @ApiResponse ({
    status: 200,
    description: '성공시 true',
    type: Boolean
  })
  @HttpCode(200)
  @Get('turn-off')
  async twoFactorSwitchOff(@User() user) {
    return this.usersService.twoFactorSwitch(user.userId, false);
  }

  @ApiOperation({ summary: '이차 인증 상태'})
  @ApiResponse ({
    status: 200,
    description: 'true / false',
    type: Boolean
  })
  @HttpCode(200)
  @Get('two-factor-status')
  async twoFactorStatus(@User() user){
    return  this.usersService.twoFactorStatus(user.userId);
  }
}
