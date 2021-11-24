import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseInterceptors, UseGuards, HttpCode, UploadedFile } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'common/decorators/user.decorator';
import { UserDto } from 'common/dto/user.dto';
import { UndefinedToNullInterceptor } from 'common/interceptors/undefinedToNull.interceptor';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserInfoDto } from './dto/userInfo.dto';
import { UserConnetInfoDto } from './dto/userConnetInfo.dto';
import { ProfileUrlDto } from './dto/profileUrl.dto';
import { UsernameDto } from './dto/username.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import fs, { copyFileSync } from 'fs';
import path from 'path';

try {
  fs.readdirSync('uploads');
} catch (error) {
  fs.mkdirSync('uploads');
}

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
  async inputUser(
    @Param('oauthId') oauthId: string,
    @Param('username') username: string,
    @Param('userId') userId: string,
    @Param('email') email: string,
  ) {
    return this.usersService.inputUser(oauthId, username, userId, email);
  }

  @ApiOperation({ summary: 'test용 user 삭제'})
  @ApiResponse ({
    status: 200,
    description: '성공',
    type: String,
  })
  @HttpCode(200)
  @Get('deleteuser/:userId')
  async deleteUser(@Param('userId') userId:string) {
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
  async getUser(@User() user) {
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
  async allUser() {
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
  async userInfo(@Param('id') param: string) {
    return this.usersService.userInfo(param);
  }

  @ApiOperation({ summary: '유저 접속 정보 조회'})
  @ApiResponse ({
    status: 200,
    description: '',
    type: UserConnetInfoDto
  })
  @HttpCode(200)
  @Get('connect/:id')
  async userConnect(@Param('id') param: string) {
    return this.usersService.userConnect(param);
  }

  @ApiOperation({ summary: '모든 접속중인 정보 조회'})
  @ApiResponse ({
    status: 200,
    type: UserConnetInfoDto
  })
  @HttpCode(200)
  @Get('connect-all')
  async allUserConnectInfo() {
    return this.usersService.allUserConnectInfo();
  }
  
  @ApiOperation({ summary: '접속자 수'})
  @ApiResponse ({
    status: 200,
    type: Number
  })
  @HttpCode(200)
  @Get('connect-member')
  async allUserConnectMember() {
    return this.usersService.allUserConnectMember();
  }

  @ApiOperation({ summary: '프로필 사진업로드 및 수정 / 업로드시 파일이름 "userID.확장자"로 보내기'})
  @ApiResponse ({
    status: 201,
    description: '파일크기제한 1MB / Fieldname = image / [ex)const formData = new FormData();  formData.append("image", data);]',
    type: Boolean
  })
  @HttpCode(201)
  @Post('upload')
  @UseInterceptors(FileInterceptor('image', {
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, 'uploads/');
      },
      filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + ext);
      },
    }),
    limits: { fileSize: 1024 * 1024 }, // 1MB
  }))
  async uploadFile(@User() User, @UploadedFile() file: Express.Multer.File) {
    return (this.usersService.uploadPofileImage(User.userId, file)) ;
  }


  @ApiOperation({ summary: 'username 보유 확인'})
  @ApiResponse ({
    status: 200,
    description: 'return : true => 닉네임 보유중',
    type: Boolean
  })
  @HttpCode(200)
  @Get('haveUsername')
  async haveUsername(@User() user) {
    return this.usersService.haveUsername(user.userId);
  }

  @ApiOperation({ summary: 'username 수정'})
  @ApiResponse ({
    status: 200,
    description: '성공시 true',
    type: Boolean
  })
  @HttpCode(200)
  @Get('update-username/:newname')
  async updateUsername(@User() user, @Param('newname') newname: string) {
    return this.usersService.updateUsername(user.userId, newname);
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


  @ApiOperation({ summary: 'moderators 추가'})
  @ApiResponse ({
    status: 200,
    description: '성공시 return: true',
    type: Boolean
  })
  @HttpCode(200)
  @Get('addModerator/:userId')
  async addModerator(@User() user, @Param('userId') userId: string){
    return  this.usersService.addAndRemoveModerator(user.userId, userId , true);
  }

  @ApiOperation({ summary: 'moderators 제거'})
  @ApiResponse ({
    status: 200,
    description: '성공시 return: true',
    type: Boolean
  })
  @HttpCode(200)
  @Get('removeModerator/:userId')
  async removeModerator(@User() user, @Param('userId') userId: string){
    return  this.usersService.addAndRemoveModerator(user.userId, userId , false);
  }

  @ApiOperation({ summary: 'admin list'})
  @ApiResponse ({
    status: 200,
    description: 'moderators 목록 출력',
  })
  @HttpCode(200)
  @Get('listAdmin')
  async listAdmin(@User() user){
    return  this.usersService.listAdmin(user.userId);
  }

  @ApiOperation({ summary: 'moderators list'})
  @ApiResponse ({
    status: 200,
    description: 'moderators 목록 출력',
  })
  @HttpCode(200)
  @Get('listModerator')
  async listModerator(@User() user){
    return  this.usersService.listModerator(user.userId);
  }

  @ApiOperation({ summary: 'ban 추가'})
  @ApiResponse ({
    status: 200,
    description: '성공시 return: true',
    type: Boolean
  })
  @HttpCode(200)
  @Get('addBan/:userId')
  async addBan(@User() user, @Param('userId') userId: string){
    return  this.usersService.addAndRemoveBan(user.userId, userId , true);
  }

  @ApiOperation({ summary: 'ban 제거'})
  @ApiResponse ({
    status: 200,
    description: '성공시 return: true',
    type: Boolean
  })
  @HttpCode(200)
  @Get('removeBan/:userId')
  async removeBan(@User() user, @Param('userId') userId: string){
    return  this.usersService.addAndRemoveBan(user.userId, userId , false);
  }

  @ApiOperation({ summary: 'ban list'})
  @ApiResponse ({
    status: 200,
    description: 'ban 목록 출력',
  })
  @HttpCode(200)
  @Get('listBan')
  async listBan(@User() user){
    return  this.usersService.listBan(user.userId);
  }

}
