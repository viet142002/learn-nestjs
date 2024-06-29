import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { INCLUDE } from '~/constants';
import { PrismaService } from '~/prisma.service';
import { IUser } from '~/users/interface/User';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput, include?: string): Promise<IUser | null> {
        const includes = include?.split(',') || [];
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
            include: {
                profile: includes.includes('profile'),
            },
        });
    }

    async findAll(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
        include?: string;
    }): Promise<Array<IUser>> {
        const { skip, take, cursor, where, orderBy, include } = params;

        const includes = include?.split(',').filter((include) => INCLUDE.USER.includes(include)) ?? [];
        const obj = includes.reduce((acc, include) => ({ ...acc, [include]: true }), {});

        return this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: obj,
        });
    }

    async createUser(data: Prisma.UserCreateInput): Promise<IUser> {
        return this.prisma.user.create({
            data,
        });
    }

    async updateOne(params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput }): Promise<IUser> {
        const { where, data } = params;
        return this.prisma.user.update({
            where,
            data,
        });
    }

    async updateProfile(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.ProfileUpdateInput;
    }): Promise<IUser> {
        const { where, data } = params;

        return this.prisma.user.update({
            where,
            data: {
                profile: {
                    update: data,
                },
            },
            include: {
                profile: true,
            },
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<IUser> {
        return this.prisma.user.delete({
            where,
        });
    }
}
