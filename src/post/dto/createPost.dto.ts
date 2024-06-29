import { IsString, MinLength, IsEnum, ValidateIf, ValidateNested } from 'class-validator';
import { CreateProductDto } from '~/post/dto/createProduct';
import { Status, Style } from '~/types';

export class CreatePostDto {
    @IsString()
    @MinLength(3)
    title: string;

    @IsString()
    @MinLength(3)
    thumb: string;

    @IsString()
    @MinLength(3)
    description: string;

    @IsString()
    @MinLength(3)
    content: string;

    @IsString()
    @IsEnum(Style)
    style: string;

    @IsString()
    @IsEnum(Status)
    status: string;

    @ValidateIf((o) => o.style === Style.PRODUCT)
    @ValidateNested()
    product: CreateProductDto;
}
