import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorService } from './author.service';
import { CityController } from './book.controller'
import { BookService } from './book.service';
import { Author } from './entities/author.entity';
import { Book } from './entities/book.entity';
import { Language } from './entities/language.entity';
import { LanguageService } from './language.service';

@Module({
    imports: [TypeOrmModule.forFeature([Book, Author, Language])],
    controllers: [CityController],
    providers: [BookService, AuthorService, LanguageService],
    exports: [
        BookService
    ]
})
export class BookModule { }
