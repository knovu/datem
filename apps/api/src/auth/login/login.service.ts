import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DeviceInfo, id } from '@src/@types';
import { LoginPayload } from './login.dto';
import { TokenService } from '../token';
import { UsersService } from '@src/users';
import { ExceptionCause } from '@src/constants';
import { User } from '@src/models';

@Injectable()
export class LoginService {
    constructor(
        private readonly usersService: UsersService,
        private readonly tokenService: TokenService,
    ) {}

    public async validateUser(username: string, password: string): Promise<User> {
        const user = await this.usersService.findOneByEmail(username);

        if (!user) {
            throw new UnauthorizedException('Invalid login. This user does not exist.', {
                cause: ExceptionCause.RESOURCE_NOT_FOUND,
            });
        }

        const isValidPassword = await this.usersService.comparePassword(password, user.password);

        if (!isValidPassword) {
            throw new UnauthorizedException('Invalid login. This password is incorrect', {
                cause: ExceptionCause.INVALID_PASSWORD,
            });
        }

        return user;
    }

    public async login(userId: id, email: string, device: DeviceInfo): Promise<LoginPayload> {
        // Generate the tokens for the auth payload
        const payload = new LoginPayload();
        const refreshToken = await this.tokenService.createRefreshToken(userId, device);
        payload.refreshToken = refreshToken;

        const accessToken = await this.tokenService.generateAccessToken(userId, email);
        payload.accessToken = accessToken.token;
        payload.expiresIn = accessToken.expiresIn;

        return payload;
    }
}
