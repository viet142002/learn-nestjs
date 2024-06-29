import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PrismaService } from '~/prisma.service';

@Module({
    controllers: [PostController],
    providers: [PrismaService],
    exports: [],
})
export class PostModule {}
