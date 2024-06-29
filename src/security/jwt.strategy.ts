import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('jwtSecret'),
        });
    }

    private static extractJWT(req: Request): string | null {
        if (!req.cookies) {
            return null;
        }
        const isRefresh = req.url.includes('refresh');
        if ('access_token' in req.cookies && !isRefresh) {
            const ac = req.cookies.access_token;
            return ac.split(' ')[1];
        }
        if ('refresh_token' in req.cookies && isRefresh) {
            const ft = req.cookies.refresh_token;
            return ft.split(' ')[1];
        }
        return null;
    }

    async validate(payload: { email: string; role: string; id: number }) {
        return { email: payload.email, role: payload.role, id: payload.id };
    }
}
