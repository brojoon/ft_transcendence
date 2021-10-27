import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, HttpCode } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'common/interceptors/undefinedToNull.interceptor';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'common/decorators/user.decorator';
import { FriendListDto } from './dto/friendlist.dto';
import { BlockListDto } from './dto/blocklist.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('ts_token')
@ApiTags('FRIEND') // API문서 카테고리
@UseInterceptors(UndefinedToNullInterceptor) // 마지막 리턴값 undifined일경우 null로 바꿈
@Controller('api/friend') // uri시작부분
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @ApiOperation({ summary: '친구추가'})
  @ApiResponse ({
    status: 200,
    description: '상대방이나 내가 Block해논 상태이면 친구 추가 안됨 / 성공시 "return: true"',
    type: Boolean
  })
  @HttpCode(200)
  @Get('addfriend/:id')
  addFriend(@User() user, @Param('id') id: string) {
    return this.friendsService.addFriend(user.userId, id);
  }

  @ApiOperation({ summary: 'Block 추가'})
  @ApiResponse ({
    status: 200,
    description: '이미 친구 상태이면 친구 제거되면서 Block시킴 / 성공시 "return: true"',
    type: Boolean
  })
  @HttpCode(200)
  @Get('addblock/:id')
  addBlock(@User() user, @Param('id') id: string) {
    return this.friendsService.addBlock(user.userId, id);
  }

  @ApiOperation({ summary: '친구 제거'})
  @ApiResponse ({
    status: 200,
    description: '한쪽에서 친구 제거하면 양쪽으로 동시에 제거됨 / 성공시 "return:ture"',
    type: Boolean
  })
  @HttpCode(200)
  @Get('removefriend/:id')
  removeFriend(@User() user, @Param('id') id: string) {
    return this.friendsService.removeFriend(user.userId, id);
  }

  @ApiOperation({ summary: 'Block 제거'})
  @ApiResponse ({
    status: 200,
    description: '성공시 "return:ture"',
    type: Boolean
  })
  @Get('removeblock/:id')
  removeBlock(@User() user, @Param('id') id: string) {
    return this.friendsService.removeBlock(user.userId, id);
  }

  @ApiOperation({ summary: '친구 리스트'})
  @ApiResponse ({
    status: 200,
    description: ' ',
    type: FriendListDto
  })
  @Get('friendlist')
  friendList(@User() user) {
    return this.friendsService.friendList(user.userId);
  }

  @ApiOperation({ summary: 'Block 리스트'})
  @ApiResponse ({
    status: 200,
    description: ' ',
    type: BlockListDto
  })
  @Get('blocklist')
  BlockList(@User() user) {
    return this.friendsService.BlockList(user.userId);
  }

  @ApiOperation({ summary: '친구 체크'})
  @ApiResponse ({
    status: 200,
    description: '상대방이 친구인지 체크 / 성공시 "return:ture"',
    type: Boolean
  })
  @Get('checkfriend/:id')
  checkFriend(@User() user, @Param('id') id: string) {
    return this.friendsService.checkFriend(user.userId, id);
  }

  @ApiOperation({ summary: 'Block 체크'})
  @ApiResponse ({
    status: 200,
    description: '상대방이 Block인지 체크 / 성공시 "return:ture"',
    type: Boolean
  })
  @Get('checkblock/:id')
  checkBlock(@User() user, @Param('id') id: string) {
    return this.friendsService.checkBlock(user.userId, id);
  }
}
