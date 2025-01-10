import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
    AuthPayload,
    RefreshTokenDto,
    RefreshTokenPayload,
    SignInDto,
    SignOutDto,
    SignOutPayload,
} from './dto';
import { AuthService } from './auth.service';
import { DeviceInfo, id } from '@src/@types';
import { Device, Public } from '@src/decorators';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '@src/decorators/current-user';
import { User } from '@src/models';
import { LocalAuthGuard } from './guards';
import { TokensService } from './tokens.service';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly tokensService: TokensService,
    ) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Mutation(() => AuthPayload, {
        name: 'login',
        description:
            'Authenticates users by validating their credentials and returning an access and refresh token.',
    })
    public async signIn(
        @CurrentUser() user: User,
        @Device() device: DeviceInfo,

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Args('input') _input: SignInDto,
    ): Promise<AuthPayload> {
        return this.authService.signIn(user.id, user.email, device);
    }

    @Public()
    @Mutation(() => RefreshTokenPayload, {
        name: 'refresh',
        description: 'Returns a new access token.',
    })
    public async refresh(@Args('input') input: RefreshTokenDto): Promise<RefreshTokenPayload> {
        const { refreshToken } = input;

        return await this.tokensService.generateAccessTokenFromRefreshToken(refreshToken);
    }

    @Mutation(() => SignOutPayload, {
        name: 'logout',
        description: 'Revokes the refresh token.',
    })
    public async signOut(
        @CurrentUser('id') id: id,
        @Args('input') input: SignOutDto,
    ): Promise<SignOutPayload> {
        const { refreshToken } = input;

        return await this.authService.signOut(id, refreshToken);
    }
}
