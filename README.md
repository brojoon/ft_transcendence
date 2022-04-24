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
