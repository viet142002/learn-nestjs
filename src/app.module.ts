import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '~/users/user.module';
import { AuthModule } from '~/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '~/config/configuration';
import { SecurityModule } from '~/security/security.module';
import { PrismaService } from '~/prisma.service';
import { PostModule } from '~/post/post.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        UserModule,
        AuthModule,
        SecurityModule,
        PostModule,
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
