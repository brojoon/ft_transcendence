import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import passport from 'passport';

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	//예외필터
	app.useGlobalFilters(new HttpExceptionFilter());
	//class-validator
	app.useGlobalPipes(
		new ValidationPipe({
		  transform: true,
		}),
	);
	// app.enableCors({
	// 	origin: true,
	// 	credentials: true,
	// });
	//API
	const config = new DocumentBuilder()
		.setTitle('ft_transcendence API')
		.setDescription('ft_transcendence 개발을 위한 API 입니다')
		.setVersion('1.0')
		.addTag('transcendence')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	app.use(passport.initialize());
	//app.use(passport.session()); //토큰 기반 로그인 경우 필요 없다

	const port = process.env.PORT || 3095;
	await app.listen(port);

	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
}
bootstrap();
