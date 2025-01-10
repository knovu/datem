import { EXCEPTION_CAUSE } from '@src/constants';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@src/users';
import { AuthPayload, SignOutPayload } from './dto';
import { TokensService } from './tokens.service';
import { DeviceInfo, id } from '@src/@types';
import { User } from '@src/models';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly tokensService: TokensService,
    ) {}

    public async validateUser(username: string, password: string): Promise<User> {
        const user = await this.usersService.findOneByEmail(username);

        if (!user) {
            throw new UnauthorizedException('Invalid login. This user does not exist.', {
                cause: EXCEPTION_CAUSE.RESOURCE_NOT_FOUND,
            });
        }

        const isValidPassword = await this.usersService.comparePassword(password, user.password);

        if (!isValidPassword) {
            throw new UnauthorizedException('Invalid login. This password is incorrect', {
                cause: EXCEPTION_CAUSE.INVALID_PASSWORD,
            });
        }

        return user;
    }

    public async signIn(userId: id, email: string, device: DeviceInfo): Promise<AuthPayload> {
        // Generate the tokens for the auth payload
        const payload = new AuthPayload();
        const refreshToken = await this.tokensService.createRefreshToken(userId, device);
        payload.refreshToken = refreshToken;

        const accessToken = await this.tokensService.generateAccessToken(userId, email);
        payload.accessToken = accessToken.token;
        payload.expiresIn = accessToken.expiresIn;

        return payload;
    }

    public async signOut(userId: id, refreshToken: string): Promise<SignOutPayload> {
        const payload = new SignOutPayload();

        try {
            payload.success = await this.tokensService.revokeRefreshToken(userId, refreshToken);
        } catch (err: unknown) {
            if (err instanceof NotFoundException) {
                throw new UnauthorizedException('Invalid token', {
                    cause: EXCEPTION_CAUSE.INVALID_TOKEN,
                });
            }

            payload.success = false;
        }

        return payload;
    }
}
