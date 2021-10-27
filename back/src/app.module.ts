import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/Users';
import ormconfig from 'ormconfig';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { Connect } from './entities/Connect';
import { FriendsModule } from './friends/friends.module';
import { FriendsService } from './friends/friends.service';
import { Friend } from './entities/Friend';
import { Block } from './entities/Block';
import { DmsModule } from './dms/dms.module';
import { Dm } from './entities/Dm';
import { Dmcontent } from './entities/Dmcontent';
import { DmsService } from './dms/dms.service';
import { EventsModule } from './events/events.module';
import { EventsGateway } from './events/events.gateway';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		  }),
		TypeOrmModule.forRoot(ormconfig),
		TypeOrmModule.forFeature([
			Users,
			Connect,
			Friend,
			Block,
			Dm,
			Dmcontent
		]),
		AuthModule,
		UsersModule,
		FriendsModule,
		DmsModule,
		EventsModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		JwtStrategy,
		UsersService,
		FriendsService,
		DmsService,
	],
})

export class AppModule implements NestModule{
	configure(consumer: MiddlewareConsumer): any {
		consumer
			.apply(LoggerMiddleware)
			.forRoutes('*')
	}
}