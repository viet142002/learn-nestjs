import { Module } from '@nestjs/common';
import { UsersController } from 'src/users/users.controller';
import { PrismaService } from '~/prisma.service';
import { UsersService } from '~/users/users.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService, PrismaService],
    exports: [UsersService],
})
export class UserModule {}
