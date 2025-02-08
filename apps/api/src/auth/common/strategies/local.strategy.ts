import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '@src/models';
import { LoginService } from '../../login';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private loginService: LoginService) {
        super();
    }

    public async validate(username: string, password: string): Promise<User> {
        const user = await this.loginService.validateUser(username, password);

        return user;
    }
}
