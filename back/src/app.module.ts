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


@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		  }),
		AuthModule,
		UsersModule,
		TypeOrmModule.forRoot(ormconfig),
		TypeOrmModule.forFeature([Users, Connect]),
		FriendsModule
	],
	controllers: [AppController],
	providers: [
		AppService,
		JwtStrategy,
		UsersService,
	],
})

export class AppModule implements NestModule{
	configure(consumer: MiddlewareConsumer): any {
		consumer
			.apply(LoggerMiddleware)
			.forRoutes('*')
	}
}