import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Header = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.res;
    }
)
