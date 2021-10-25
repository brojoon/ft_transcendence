import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { Block } from 'src/entities/Block';
import { Chatchannel } from 'src/entities/Chatchannel';
import { Chatcontent } from 'src/entities/Chatcontent';
import { Chatmember } from 'src/entities/Chatmember';
import { Connect } from 'src/entities/Connect';
import { Dm } from 'src/entities/Dm';
import { Dmcontent } from 'src/entities/Dmcontent';
import { Friend } from 'src/entities/Friend';
import { History } from 'src/entities/History';
import { Users } from 'src/entities/Users';

dotenv.config();
const config: TypeOrmModuleOptions = {
  // type: 'postgres',
  // host: process.env.DB_HOST,
  // port: +process.env.DB_PORT,
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_DATABASE,
  type: 'mysql',
  host: process.env.DB_HOST1,
  port: +process.env.DB_PORT1,
  username: process.env.DB_USERNAME1,
  password: process.env.DB_PASSWORD1,
  database: process.env.DB_DATABASE1,
  entities: [
    Block,
    Chatchannel,
    Chatcontent,
    Chatmember,
    Connect,
    Dm,
    Dmcontent,
    Friend,
    History,
    Users
  ],
  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: { migrationsDir: 'src/migrations' },
  autoLoadEntities: true,
  synchronize: false,// 처음 true로 표  만들고 한번 만들면 false로 바꾼다.
  logging: true,
  keepConnectionAlive: true,
};

export = config;