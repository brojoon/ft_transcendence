import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

// 라우터 전에 호출
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	private logger = new Logger('HTTP');

	use(request: Request, response: Response, next: NextFunction): void {
		const { ip, method, originalUrl } = request;
		const userAgent = request.get('user-agent') || '';

		// 비동기식으로 라우터 끝날때 기록
		response.on('finish', () => {
			const { statusCode } = response;
			const contentLength = response.get('content-length');

			this.logger.log(
			`${method} ${originalUrl} ${statusCode} ${contentLength} - ${ip}`,
			);
		});
		next();
	}
}
