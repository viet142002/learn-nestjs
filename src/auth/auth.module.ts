import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { AuthController } from '~/auth/auth.controller';
import { AuthService } from '~/auth/auth.service';
import { UserModule } from '~/users/user.module';
// import { JwtStrategy } from '~/strategies/jwt.strategy';
// import { JwtAuthGuard } from '~/guards/jwt.guard';

@Module({
    imports: [
        // forwardRef(() => UserModule),
        UserModule,
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get<string>('jwtSecret'),
                    signOptions: { expiresIn: '1d' },
                };
            },
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
