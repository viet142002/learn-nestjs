import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '~/auth/dto/register.dto';
import { UsersService } from '~/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    //function hash password
    async hashPassword(password: string): Promise<string> {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hash(password, salt);
    }

    //function compare password param with user password in database
    async comparePassword(password: string, storePasswordHash: string): Promise<any> {
        return await bcrypt.compare(password, storePasswordHash);
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOne({
            email,
        });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const { password: pass, ...result } = user;

        const check = await this.comparePassword(password, pass);

        if (!check) {
            throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    async refreshToken(id: number) {
        const user = await this.usersService.findOne({ id });
        const payload = { email: user.email, id: user.id, role: user.role };
        return {
            access_token: `Bearer ${this.jwtService.sign(payload)}`,
        };
    }

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);
        const payload = { email: user.email, id: user.id, role: user.role };
        return {
            user,
            access_token: `Bearer ${this.jwtService.sign(payload)}`,
            refresh_token: `Bearer ${this.jwtService.sign(payload, { expiresIn: '7d' })}`,
        };
    }

    async registerUser(data: RegisterDto): Promise<any> {
        const { email, password, fullname } = data;
        const user = await this.usersService.findOne({ email });
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = await this.hashPassword(password);
        return this.usersService.createUser({
            email,
            password: hashedPassword,
            profile: {
                create: {
                    fullname,
                },
            },
        });
    }
}
