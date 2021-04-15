// 설치 : npm i class-validator class-transformer
// 많은 기능을 제공해줌 - https://github.com/typestack/class-validator
import { IsNumber, IsOptional, isString } from "class-validator";

import { IsString } from 'class-validator'; 

export class CreateMovieDto{

    @IsString()
    readonly title: string;

    @IsNumber()
    readonly year: number;

    @IsOptional()
    @IsString({ each: true })
    readonly genres: string[];
}