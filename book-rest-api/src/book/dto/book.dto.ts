import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsOptional, IsString, } from "class-validator";
import { Author } from "../entities/author.entity";
import { Language } from "../entities/language.entity";


export class CreateBookDto {
    @IsString()
    title: string; // название 
    author: Author ; // автор

    @IsString()
    description: string; //описание 

    @IsNumber()
    pageCount: number; // число страниц 

    lang: Language; // язык
    
    @IsString()
    genre: string; //  жанр 

}


export class UpdateBookDto extends PartialType(CreateBookDto) {
}