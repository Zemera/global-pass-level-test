import { PartialType } from "@nestjs/mapped-types";
import {  IsString, } from "class-validator";



export class CreateAuthorDto {
    @IsString()
    fullName: string; // название 
}


export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
}