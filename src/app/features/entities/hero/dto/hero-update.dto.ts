import { IsNotEmpty, IsString } from "class-validator";
import { HeroCreateDto } from "./hero-create.dto";

export class HeroUpdateDto extends HeroCreateDto {

    @IsString()
    @IsNotEmpty()
    id!:string

}