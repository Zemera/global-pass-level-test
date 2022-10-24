import { PartialType } from "@nestjs/mapped-types";
import {  IsString, } from "class-validator";

export class CreateLanguageDto {
    @IsString()
    name: string; // название 
}


export class UpdateLanguageDto extends PartialType(CreateLanguageDto) {
}