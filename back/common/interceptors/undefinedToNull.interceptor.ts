import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        // 전 부분 넣을수 있음
        // ....
        // return부턴 마지막 부분
        return next
        .handle()
        .pipe(map((data) => data === undefined ? null : data))
    }
}