import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from 'ormconfig';
import { AuthModule } from './auth/auth.module';
import { FriendsModule } from './friends/friends.module';
import { DmsModule } from './dms/dms.module';
import { EventsModule } from './events/events.module';
import { ChannelsModule } from './channels/channels.module';
import { GameModule } from './game/game.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRoot(ormconfig),
		AuthModule,
		UsersModule,
		FriendsModule,
		DmsModule,
		EventsModule,
		ChannelsModule,
		GameModule,
	],
	controllers: [AppController],
	providers: [AppService],
})

export class AppModule implements NestModule{
	configure(consumer: MiddlewareConsumer): any {
		consumer
			.apply(LoggerMiddleware)
			.forRoutes('*')
	}
}
