import { IsNumber, IsString, MinLength, Min } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @MinLength(3)
    code: string;

    @IsNumber()
    @Min(0)
    price: number;
}
