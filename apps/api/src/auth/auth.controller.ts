import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
    AuthPayload,
    RefreshTokenDto,
    RefreshTokenPayload,
    SignInDto,
    SignOutDto,
    SignOutPayload,
} from './dto';
import { DeviceInfo, id } from '@src/@types';
import { CurrentUser, Device, Public } from '@src/decorators';
import { LocalAuthGuard } from './guards';
import { User } from '@src/models';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { TokensService } from './tokens.service';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly tokensService: TokensService,
    ) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: UnauthorizedException })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: BadRequestException })
    @ApiBody({
        type: SignInDto,
    })
    @Post('login')
    public async signIn(
        @CurrentUser() user: User,
        @Device() device: DeviceInfo,
    ): Promise<AuthPayload> {
        return await this.authService.signIn(user.id, user.email, device);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: UnauthorizedException })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: BadRequestException })
    @ApiBody({
        type: RefreshTokenDto,
    })
    @Post('refresh')
    public async refresh(@Body() body: RefreshTokenDto): Promise<RefreshTokenPayload> {
        const { refreshToken } = body;

        return await this.tokensService.generateAccessTokenFromRefreshToken(refreshToken);
    }

    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: UnauthorizedException })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: BadRequestException })
    @ApiBody({
        type: SignOutDto,
    })
    @Post('logout')
    public async signOut(
        @CurrentUser('id') id: id,
        @Body() body: SignOutDto,
    ): Promise<SignOutPayload> {
        const { refreshToken } = body;

        return await this.authService.signOut(id, refreshToken);
    }
}
