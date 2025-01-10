import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '@src/constants';
import { getRequestFromContext } from '@src/utils';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    public canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        console.log('JwtAuthGuard.canActivate');

        return super.canActivate(context);
    }

    public getRequest(context: ExecutionContext): any {
        console.log('JwtAuthGuard.getRequest');
        const request = getRequestFromContext(context);
        return request;
    }
}
