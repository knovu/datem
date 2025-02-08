import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterService {
    constructor() {}

    public async register(username: string, firstName: string, lastN): Promise<LoginPayload> {
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
