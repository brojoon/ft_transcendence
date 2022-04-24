<h2 align=center > mighty Pong contest! - ft_transcendence 📚 </h2>
</br>

<p align=center> 📆 2021.10.2 ~ 2022.01.7</p>

<h2 align=center>preview</h2>

## 프로젝트 살펴보기 🔎
### 🙎‍♂️ 팀 구성 
|김형준|최훈진|조영록|
| :---: | :---: | :---: |
|<img src=https://github.com/brojoon.png width=200 height=200 />|<img src=https://github.com/20151883.png width=200 height=200 />|<img src=https://github.com/oddczv1.png width=200 height=200 />|
|[brojoon](https://github.com/brojoon)|[20151883](https://github.com/20151883)|[oddczv1](https://github.com/oddczv1)|
|Front-End|Back-End|Back-End|

- 프론트엔드 개발자 1명, 백엔드 개발자 2명

<br>
<hr/>

### 🔥 서비스 소개
#### 


<hr/>

### ⭐️  주요 기능
 - 유저
 
 - 게임

 - 소셜 기능


> #### 📁 프로젝트 구조
```
📦ft_transcendence
 ┣ 📂back
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📂decorators
 ┃ ┃ ┃ ┣ 📜header.decorator.ts
 ┃ ┃ ┃ ┣ 📜token.decorator.ts
 ┃ ┃ ┃ ┗ 📜user.decorator.ts
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📜two-factor.dto.ts
 ┃ ┃ ┃ ┗ 📜user.dto.ts
 ┃ ┃ ┗ 📂interceptors
 ┃ ┃ ┃ ┗ 📜undefinedToNull.interceptor.ts
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┣ 📂guards
 ┃ ┃ ┃ ┃ ┣ 📜intra42-auth.guard.ts
 ┃ ┃ ┃ ┃ ┗ 📜jwt-auth.guard.ts
 ┃ ┃ ┃ ┣ 📂strategies
 ┃ ┃ ┃ ┃ ┣ 📜google.strategy.ts
 ┃ ┃ ┃ ┃ ┣ 📜intra42.strategy.ts
 ┃ ┃ ┃ ┃ ┣ 📜jwt.strategy.ts
 ┃ ┃ ┃ ┃ ┗ 📜kakao.strategy.ts
 ┃ ┃ ┃ ┣ 📜auth.controller.ts
 ┃ ┃ ┃ ┣ 📜auth.module.ts
 ┃ ┃ ┃ ┣ 📜auth.service.spec.ts
 ┃ ┃ ┃ ┣ 📜auth.service.ts
 ┃ ┃ ┃ ┗ 📜constants.ts
 ┃ ┃ ┣ 📂channels
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📜channel.dto.ts
 ┃ ┃ ┃ ┃ ┗ 📜chnnelString.dto.ts
 ┃ ┃ ┃ ┣ 📂exceptionfilter
 ┃ ┃ ┃ ┃ ┗ 📜exception.filter.ts
 ┃ ┃ ┃ ┣ 📜channels.controller.spec.ts
 ┃ ┃ ┃ ┣ 📜channels.controller.ts
 ┃ ┃ ┃ ┣ 📜channels.module.ts
 ┃ ┃ ┃ ┣ 📜channels.service.spec.ts
 ┃ ┃ ┃ ┗ 📜channels.service.ts
 ┃ ┃ ┣ 📂database
 ┃ ┃ ┃ ┗ 📂seeds
 ┃ ┃ ┃ ┃ ┗ 📜create-initial-data.ts
 ┃ ┃ ┣ 📂dms
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┗ 📜message.dto.ts
 ┃ ┃ ┃ ┣ 📜dms.controller.spec.ts
 ┃ ┃ ┃ ┣ 📜dms.controller.ts
 ┃ ┃ ┃ ┣ 📜dms.module.ts
 ┃ ┃ ┃ ┣ 📜dms.service.spec.ts
 ┃ ┃ ┃ ┗ 📜dms.service.ts
 ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┣ 📜Block.ts
 ┃ ┃ ┃ ┣ 📜Blockmember.ts
 ┃ ┃ ┃ ┣ 📜Chatchannel.ts
 ┃ ┃ ┃ ┣ 📜Chatcontent.ts
 ┃ ┃ ┃ ┣ 📜Chatmember.ts
 ┃ ┃ ┃ ┣ 📜Connect.ts
 ┃ ┃ ┃ ┣ 📜Dm.ts
 ┃ ┃ ┃ ┣ 📜Dmcontent.ts
 ┃ ┃ ┃ ┣ 📜Friend.ts
 ┃ ┃ ┃ ┣ 📜History.ts
 ┃ ┃ ┃ ┗ 📜Users.ts
 ┃ ┃ ┣ 📂events
 ┃ ┃ ┃ ┣ 📜events.gateway.spec.ts
 ┃ ┃ ┃ ┣ 📜events.gateway.ts
 ┃ ┃ ┃ ┣ 📜events.module.ts
 ┃ ┃ ┃ ┣ 📜matchInfo.ts
 ┃ ┃ ┃ ┣ 📜onGameMap.ts
 ┃ ┃ ┃ ┗ 📜onlineMap.ts
 ┃ ┃ ┣ 📂friends
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📜blocklist.dto.ts
 ┃ ┃ ┃ ┃ ┗ 📜friendlist.dto.ts
 ┃ ┃ ┃ ┣ 📜friends.controller.spec.ts
 ┃ ┃ ┃ ┣ 📜friends.controller.ts
 ┃ ┃ ┃ ┣ 📜friends.module.ts
 ┃ ┃ ┃ ┣ 📜friends.service.spec.ts
 ┃ ┃ ┃ ┗ 📜friends.service.ts
 ┃ ┃ ┣ 📂game
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📜create-game.dto.ts
 ┃ ┃ ┃ ┃ ┗ 📜update-game.dto.ts
 ┃ ┃ ┃ ┣ 📜game.controller.spec.ts
 ┃ ┃ ┃ ┣ 📜game.controller.ts
 ┃ ┃ ┃ ┣ 📜game.module.ts
 ┃ ┃ ┃ ┣ 📜game.service.spec.ts
 ┃ ┃ ┃ ┣ 📜game.service.ts
 ┃ ┃ ┃ ┣ 📜gameInit.ts
 ┃ ┃ ┃ ┣ 📜gameMap.ts
 ┃ ┃ ┃ ┗ 📜test.js
 ┃ ┃ ┣ 📂middlewares
 ┃ ┃ ┃ ┗ 📜logger.middleware.ts
 ┃ ┃ ┣ 📂migration
 ┃ ┃ ┃ ┗ 📜1634759402349-careToType.ts
 ┃ ┃ ┣ 📂users
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📜profileUrl.dto.ts
 ┃ ┃ ┃ ┃ ┣ 📜userConnetInfo.dto.ts
 ┃ ┃ ┃ ┃ ┣ 📜userInfo.dto.ts
 ┃ ┃ ┃ ┃ ┗ 📜username.dto.ts
 ┃ ┃ ┃ ┣ 📜users.controller.spec.ts
 ┃ ┃ ┃ ┣ 📜users.controller.ts
 ┃ ┃ ┃ ┣ 📜users.module.ts
 ┃ ┃ ┃ ┣ 📜users.service.spec.ts
 ┃ ┃ ┃ ┗ 📜users.service.ts
 ┃ ┃ ┣ 📜app.controller.spec.ts
 ┃ ┃ ┣ 📜app.controller.ts
 ┃ ┃ ┣ 📜app.module.ts
 ┃ ┃ ┣ 📜app.service.ts
 ┃ ┃ ┣ 📜http-exception.filter.ts
 ┃ ┃ ┗ 📜main.ts
 ┃ ┣ 📂test
 ┃ ┃ ┣ 📜app.e2e-spec.ts
 ┃ ┃ ┗ 📜jest-e2e.json
 ┃ ┣ 📜.dockerignore
 ┃ ┣ 📜.env
 ┃ ┣ 📜.eslintrc.js
 ┃ ┣ 📜.gitignore
 ┃ ┣ 📜.prettierrc
 ┃ ┣ 📜docker-entrypoint.sh
 ┃ ┣ 📜Dockerfile
 ┃ ┣ 📜index.html
 ┃ ┣ 📜index.js
 ┃ ┣ 📜nest-cli.json
 ┃ ┣ 📜ormconfig.ts
 ┃ ┣ 📜package-lock.json
 ┃ ┣ 📜package.json
 ┃ ┣ 📜README.md
 ┃ ┣ 📜tsconfig.build.json
 ┃ ┣ 📜tsconfig.json
 ┃ ┗ 📜webpack-hmr.config.js
 ┣ 📂front
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂Achievement
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂AdminPageProfile
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂BasicModal
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂BlockList
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂ChannelBody
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂ChannelChatHeader
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂ChannelChatList
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂ChannelForm
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂ChannelHeader
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂ChannelInviteModal
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂ChannelLeftDrawBar
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂ChannelMemberDrawBar
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂ChannelProfile
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂ChannelRoomSettingModal
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂ChatBox
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂DMChatHeader
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂DMChatList
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂DMLeftDrawer
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂FriendsList
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂FriendsOnlineList
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂GamePixiContainer
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂GameSetting
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂IntroduceModal
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂LeftSideBar
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂MyProfileCard
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂NickNameChangeField
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂ProtectedRoomModal
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂TabPanel
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂TwoFactorSwitch
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂UserFriendCard
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂UserMatches
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂UserProfileAchieveCard
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂UserProfileCard
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂UserRightModal
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂UsersList
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┗ 📂UserStatistics
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂hooks
 ┃ ┃ ┗ 📜useInput.ts
 ┃ ┣ 📂img
 ┃ ┃ ┗ 📜bg3.jpg
 ┃ ┣ 📂layouts
 ┃ ┃ ┣ 📂App
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┗ 📂Content
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂Achievements
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂Admin
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂AdminChannel
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂ChannelCreate
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂ChannelDiscover
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂ChannelRoom
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂Channels
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂DirectMessage
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂FirstStep
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂Game
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂History
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂Home
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂LogIn
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂Match
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂PingPong
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂Profile
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂ProfileSetting
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂RootPage
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂Social
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂SocialSlider
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂TwoFactor
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┗ 📂Users
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂store
 ┃ ┃ ┗ 📂socket
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂typings
 ┃ ┃ ┗ 📜db.ts
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜config.ts
 ┃ ┃ ┣ 📜cookie.ts
 ┃ ┃ ┣ 📜fetcher.ts
 ┃ ┃ ┣ 📜getToken.ts
 ┃ ┃ ┣ 📜makeSection.ts
 ┃ ┃ ┗ 📜useSocket.ts
 ┃ ┣ 📜.env
 ┃ ┣ 📜.eslintrc
 ┃ ┣ 📜.gitignore
 ┃ ┣ 📜.prettierrc
 ┃ ┣ 📜client.tsx
 ┃ ┣ 📜Dockerfile
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜index.html
 ┃ ┣ 📜init.sh
 ┃ ┣ 📜nginx.conf
 ┃ ┣ 📜package-lock.json
 ┃ ┣ 📜package.json
 ┃ ┣ 📜tsconfig-for-webpack-config.json
 ┃ ┣ 📜tsconfig.json
 ┃ ┗ 📜webpack.config.ts
 ┣ 📜.gitignore
 ┣ 📜connect.sh
 ┣ 📜db.sql
 ┣ 📜docker-compose.yml
 ┣ 📜package-lock.json
 ┗ 📜README.md
 ```
