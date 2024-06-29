import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma.service';

@Injectable()
export class PostService {
    constructor(private readonly prisma: PrismaService) {}
    async findAll({
        skip,
        take,
        cursor,
        where,
        orderBy,
        include,
    }: {
        skip?: number;
        take?: number;
        cursor?: any;
        where?: any;
        orderBy?: any;
        include?: any;
    }): Promise<Array<any>> {
        return [];
    }

    async findOne(): Promise<any> {
        return {};
    }

    async createPost(): Promise<any> {
        return {};
    }

    async updatePost(): Promise<any> {
        return {};
    }

    async deletePost(): Promise<any> {
        return {};
    }
}
