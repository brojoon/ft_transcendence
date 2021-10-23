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
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
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
  charset: 'utf8mb4',
  synchronize: true,// 한번 만들면 false로 바꾼다.
  logging: true,
  keepConnectionAlive: true,
};

export = config;
