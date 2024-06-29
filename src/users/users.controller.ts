import { Body, Controller, Get, Put, Query, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Roles } from '~/decorator/role-decorator';
import { User } from '~/decorator/user-decorator';
import { JwtAuthGuard } from '~/security/jwt.guard';
import { RolesGuard } from '~/security/roles.guard';
import { Role } from '~/types';
import { UpdateUserDto } from '~/users/dto/updateUser.dto';
import { QueryAllUsers, IUser } from '~/users/interface';
import { UsersService } from '~/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/me')
    @UseGuards(JwtAuthGuard)
    async geMe(@User() user: IUser, @Query() query): Promise<IUser> {
        const { include } = query;
        const userData = await this.usersService.findOne({ id: user.id }, include);
        return userData;
    }

    @Get('/')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async getAllUsers(@Query() query: QueryAllUsers): Promise<Array<IUser>> {
        const { include, fullname, email } = query;
        return this.usersService.findAll({
            take: 10,
            where: {
                email: {
                    contains: email,
                },
                profile: {
                    fullname: {
                        contains: fullname,
                    },
                },
            },
            skip: 0,
            include,
        });
    }

    @Put('/me')
    @UseGuards(JwtAuthGuard)
    async updateMe(@User() user: IUser, @Body() data: UpdateUserDto): Promise<IUser> {
        const userData = await this.usersService.updateProfile({
            where: {
                id: user.id,
            },
            data: data as Prisma.ProfileUpdateInput,
        });
        return userData;
    }

    @Put('/update')
    @UseGuards(JwtAuthGuard)
    async updateUser(@User() user: IUser, @Body() data: UpdateUserDto): Promise<IUser> {
        const userData = await this.usersService.updateOne({
            where: {
                id: user.id,
            },
            data: data as Prisma.UserUpdateInput,
        });
        return userData;
    }
}
