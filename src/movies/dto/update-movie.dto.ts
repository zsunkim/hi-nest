import { IsNumber, isString } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from "./create-movie.dto";


// PartialType - 'npm i @nestjs/mapped-types' : 타입을 변환시키고 사용할 수 있게하는 패키지
// 전부 필수값이 아님
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}