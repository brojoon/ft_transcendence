<h2 align=center > mighty Pong contest! - ft_transcendence 🏓 </h2>
</br>

<p align=center><img src=https://user-images.githubusercontent.com/52714837/164992060-9a72307d-24e7-483d-b461-06b57c21500c.png /></p>



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


### 🚀 서비스 소개
### 웹브라우저에서 즐기는 온라인 Pong contest!

- Profile ( 자신의 프로필 )
   - 프로필 사진, 닉네임을 변경 할수 있습니다.
   - 매치 전적, 업적 시스템이 있습니다.
   - GOOGLE OTP를 등록할수 있습니다.

- Social ( 유저들간의 소통 )
   - 유저간 DM을 보내고 친구를 맺거나 또는 상대방을 BLOCK하는등 혼자가 아닌 다른 유저와 상호작용을 할수 있도록 하였습니다.
   - 유저라면 누구나 채널을 만들수 있습니다.
   - 채널을 만든다면 공개채널, 참여시 비밀번호가 필요한 채널, 비공개채널 이렇게 3가지로 나뉘게 됩니다.
   - 채널에 유저가 직접 참가하거나 또는 초대를 할수 있고 참가한 유저들끼리 채팅을 나눌수 있습니다.
   - 채널에는 채널을 생성한 오너가 있고 오너는 채널에 참가한 일반 유저를 채팅방 관리자를 지정할수 있습니다.
   - 오너와 채팅방 관리자는 채널에 참가한 일반 유저를 mute, kick, ban을 할수있습니다.
 
- Game ( Pong game )
   - 게임 매칭에는 랜덤매칭과 유저 프로필을 통해 매칭을 신청하는 방식으로 2가지가 존재합니다.
   - 게임을 시작하기전 게임맵, 판수, ball seed등 옵션을 정할수 있습니다.
   - 게임이 시작되었다면 게임에 참여하지 않은 다른유저가 게임중인 유저의 프로필을 통해 게임을 관전할수 있습니다. 
#### 


<hr/>

### ⭐️ 주요 기능 설명
* 유저 🧩
    * [x] 42, GOOGLE OAUTH를 통한 로그인
    * [x] GOOGLE OTP 등록후 로그인시 인증 대체 
    * [x] 프로필 사진 변경
    * [x] 닉네임 변경
    * [x] 매치 전적
    * [x] 업적 시스템

* 소셜 🧩
    * [x] 친구추가, 제거, BLOCK (메세지나 매치신청을 더이상 받지않음)
    * [x] 채널 생성 (public, protected, private)
    * [x] 1:1 DM 보내기, 채널에선 다수의 유저가 채팅 (채팅 데이터 무한 스크롤링 적용)    
    * [x] 채널을 생성한 오너는 채널에 참여한 일반 유저를 amdin으로 지정 가능
    * [x] 채널의 오너 또는 admin은 참여한 일반 유저에게 mute, kick, ban을 할수있음
    * [x] 소켓을 통해 실시간으로 모든 유저의 상태 정보를 받고있음 profile 사진에서 상태 확인가능 \
          (초록색: 로그인, 빨간색: 로그아웃, 노란색: 게임중) 
    * [x] 채널의 오너는 채널 유형을 변경 가능(public, protected, private)
    * [x] 채널의 오너는 채널을 삭제 할수있음. 
    * [x] 채널에 유저 초대 기능 
    * [x] 유저 검색 기능
 
* 게임 🧩
    * [x] 랜덤 매칭 or 특정 유저에게 매칭 신청 가능
    * [x] 특정 유저에게 매칭 신청을 받았다면 DM을 통하여 게임으로 접속 
    * [x] 게임 시작전 옵션 지정 가능 (판수, 맵, ball speed, random ball degree) 
    * [x] 게임중인 유저가 있다면 해당 유저의 프로필을 통해 진행중인 게임 관전 가능
    * [x] pong게임 구현에는 Pixi.js를 사용하였습니다.

* 사이트 관리자 🧩
    * [x] 채널 삭제 및 채널의 오너, admin이 아니더라도 mute, ban, kick을 할수있음
    * [x] 사이트의 유저를 moderator로 지정가능
    * [x] moderator은 다른 일반 유저를 moderator로 지정할수 없다는것을 제외하고는 \
          사이트 관리자와 동일한 역할을 수행 할수있음
    * [x] 특정 유저를 사이트에서 ban 할수있음 (해제도 가능)




> #### 📁 프로젝트 구조
``` ts
📦ft_transcendence
 ┣ 📂back
 ┃ ┣ 📂common               // 공통 dto, 데코레이터, 인터셉터 모음
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂auth               // guards, oauth, jwt strategy auth 관련 모음
 ┃ ┃ ┣ 📂channels           // 채널 dto, 모듈, 컨트롤러, 서비스 
 ┃ ┃ ┣ 📂database           // 초기 더미데이터 seed
 ┃ ┃ ┣ 📂dms                // DM dto, 모듈, 컨트롤러, 서비스
 ┃ ┃ ┣ 📂entities           // 테이블 구조 엔티티
 ┃ ┃ ┣ 📂events             // 이벤트 게이트웨이 소켓관련 파일
 ┃ ┃ ┣ 📂friends            // 친구 dto, 모듈, 컨트롤러, 서비스
 ┃ ┃ ┣ 📂game               // 게임 dto, 모듈, 컨트롤러, 서비스
 ┃ ┃ ┣ 📂middlewares        // 서버 로그용 미들웨어
 ┃ ┃ ┣ 📂migration
 ┃ ┃ ┣ 📂users              // 유저 dto, 모듈, 컨트롤러, 서비스
 ┃ ┃ ┣ 📜app.controller.spec.ts 
 ┃ ┃ ┣ 📜app.controller.ts
 ┃ ┃ ┣ 📜app.module.ts
 ┃ ┃ ┣ 📜app.service.ts
 ┃ ┃ ┣ 📜http-exception.filter.ts
 ┃ ┃ ┗ 📜main.ts 
 ┃ ┣ 📂test
 ┃ ┣ 📜.dockerignore
 ┃ ┣ 📜.eslintrc.js
 ┃ ┣ 📜.gitignore
 ┃ ┣ 📜.prettierrc
 ┃ ┣ 📜docker-entrypoint.sh // 도커파일 실행후 실행되는 스크립트
 ┃ ┣ 📜Dockerfile           // 배포 자동화 도커파일
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
 ┃ ┣ 📂components           //재사용 가능한 컴포넌트 모음
 ┃ ┣ 📂hooks                // 공통 hooks 모음
 ┃ ┣ 📂img                  // 메인 bg
 ┃ ┣ 📂layouts              // 페이지 공통 레이아웃 모음
 ┃ ┣ 📂pages                // 페이지 컴포넌트
 ┃ ┣ 📂store                // context API 스토어 (유저 상태 체크 소켓 관리용으로 사용됨)
 ┃ ┣ 📂typings              // db 데이터 type 모음
 ┃ ┣ 📂utils                // 유틸로 쓰이는 함수들 모음
 ┃ ┣ 📜.eslintrc
 ┃ ┣ 📜.gitignore
 ┃ ┣ 📜.prettierrc
 ┃ ┣ 📜client.tsx
 ┃ ┣ 📜Dockerfile           // 배포 자동화 도커파일
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜index.html
 ┃ ┣ 📜init.sh              // 도커파일 실행후 실행되는 스크립트, nginx 설정 관련
 ┃ ┣ 📜nginx.conf           // nginx 환경파일
 ┃ ┣ 📜package-lock.json
 ┃ ┣ 📜package.json
 ┃ ┣ 📜tsconfig-for-webpack-config.json
 ┃ ┣ 📜tsconfig.json
 ┃ ┗ 📜webpack.config.ts
 ┣ 📜.gitignore
 ┣ 📜connect.sh
 ┣ 📜db.sql // postgres dubmp
 ┣ 📜docker-compose.yml     // 배포 자동화 도커 컴포우즈 파일
 ┣ 📜package-lock.json
 ┗ 📜README.md
 ```
