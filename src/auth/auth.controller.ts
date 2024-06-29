import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from '~/auth/auth.service';
import { LoginDto } from '~/auth/dto/login.dto';
import { RegisterDto } from '~/auth/dto/register.dto';
import { User } from '~/decorator/user-decorator';
import { JwtAuthGuard } from '~/security/jwt.guard';
import { IUser } from '~/users/interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const data = await this.authService.login(loginDto.email, loginDto.password);
        res.cookie('access_token', data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
        });
        res.cookie('refresh_token', data.refresh_token, {
            path: '/auth/refresh',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
        });
        return data.user;
    }

    @Post('register')
    async register(@Body() data: RegisterDto) {
        return this.authService.registerUser(data);
    }

    @Post('refresh')
    @UseGuards(JwtAuthGuard)
    async refresh(@User() user: IUser) {
        const access_token = await this.authService.refreshToken(user.id);
        return { access_token };
    }
}
