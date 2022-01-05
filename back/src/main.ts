import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import passport from 'passport';
import path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	//예외필터
	app.useGlobalFilters(new HttpExceptionFilter());
	//class-validator
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
		}),
	);
	// Cors에러 안나게 프런트와 소통
	app.enableCors({
		origin: true,
		credentials: true,
	});
	// 경로파일 열어볼수 있게 설정
	app.useStaticAssets(
		path.join(__dirname, '..', 'uploads'),
		{ prefix: '/uploads', },
	);
	// API문서 설정
	const config = new DocumentBuilder()
		.setTitle('ft_transcendence API')
		.setDescription('ft_transcendence 개발을 위한 API 입니다')
		.setVersion('1.0')
		.addTag('transcendence')
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
				name: 'JWT',
				description: 'Enter JWT token',
				in: 'header',
			},
			'ts_token',
		)
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
	// passport초기화
	app.use(passport.initialize());
	// 서버 리슨 포트
	const port = process.env.PORT || 3095;
	await app.listen(port);
	// HOT RELOADING
	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
}

bootstrap();
