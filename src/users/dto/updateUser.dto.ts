import { IsOptional, IsString, MinLength } from 'class-validator';

class ProfileDtp {
    @IsString()
    @IsOptional()
    @MinLength(3)
    fullname: string;

    @IsString()
    @IsOptional()
    @MinLength(3)
    phone: string;
}

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    @MinLength(3)
    name: string;

    @IsString()
    @IsOptional()
    @MinLength(3)
    password: string;

    @IsOptional()
    profile: ProfileDtp;
}
