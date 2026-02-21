import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

export class HeroCreateDto {
    
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres'})
    @MaxLength(20, { message: 'El nombre no puede tener más de 20 caracteres'})
    name!: string;

    @IsString()
    @IsOptional()
    @MaxLength(100, { message: 'La descripción no puede tener más de 100 caracteres'})
    description!: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    age!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100, { message: 'La descripción no puede tener más de 100 caracteres'})
    power!: string;

}