import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';

import { Permissions } from '~/decorator/permission-decorator';
import { CreatePostDto } from '~/post/dto/createPost.dto';
import { JwtAuthGuard } from '~/security/jwt.guard';
import { PermissionGuard } from '~/security/permission.guard';
import { RolesGuard } from '~/security/roles.guard';
import { Permission } from '~/types';

@Controller('posts')
export class PostController {
    constructor() {}

    @Get('/')
    async getAllPosts(): Promise<Array<any>> {
        return [];
    }

    @Get('/me')
    @UseGuards(JwtAuthGuard)
    async getMyPosts(): Promise<Array<any>> {
        return [];
    }

    @Get('/search')
    async searchPosts(): Promise<Array<any>> {
        return [];
    }

    @Post('/')
    @UseGuards(JwtAuthGuard, RolesGuard, PermissionGuard)
    @Permissions(Permission.CREATE_POST)
    async createPost(@Body() data: CreatePostDto): Promise<any> {
        return data;
    }

    @Put('/:id')
    async updatePost(): Promise<any> {
        return {};
    }

    @Delete('/:id')
    async deletePost(): Promise<any> {
        return {};
    }
}
