import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { getRequestFromContext, isGraphQLRequest } from '@src/utils';
import { SignInDto } from '../dto';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        // Call the original canActivate method from the LocalAuthGuard
        const result = (await super.canActivate(context)) as boolean;

        return result;
    }

    public getRequest(context: ExecutionContext): any {
        const request = getRequestFromContext(context);
        const isGraphQL = isGraphQLRequest(context);

        if (isGraphQL) {
            const gqlExecutionContext = GqlExecutionContext.create(context);
            const gqlContext = gqlExecutionContext.getContext();
            const gqlArgs = gqlExecutionContext.getArgs().input as SignInDto;
            gqlContext.req.body = gqlArgs;
            return gqlContext.req;
        }

        return request;
    }
}
