import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Book } from './entities/book.entity'
import { BookService } from './book.service'
import { AuthorService } from './author.service'
import { BaseController } from './services/base.controller';
import { CreateBookDto } from './dto/book.dto';
import { Author } from './entities/author.entity';
import { Language } from './entities/language.entity';
import { LanguageService } from './language.service';


@Controller('books')

export class CityController extends BaseController<Book>{
    constructor(
        private readonly bookService: BookService,
        private readonly AuthorService: AuthorService,
        private readonly languageService: LanguageService,
    ) { super(bookService); }

    @Post()
    public async post(@Body() newItem: CreateBookDto): Promise<Book> {
        try {
            newItem.author = await this.AuthorService.createIfNotExist({ fullName: (newItem.author as any) })
            newItem.lang = await this.languageService.createIfNotExist({ name: (newItem.lang as any) })
            return this.bookService.create(newItem)

        } catch (error) {
            console.log(error.message);
            throw new BadRequestException(error)
        }

    }

    @Get('authors-list')
    public getAuthorList(): Promise<Author[]> {
        try {
            return this.AuthorService.findAll()
        } catch (error) {
            console.log(error.message);
            throw new BadRequestException(error)
        }

    }

    @Delete('/author/delete/:id')
    public deleteAuth(@Param('id') id: number): Promise<any> {

        try {
            return this.AuthorService.remove(id)
        } catch (error) {
            throw new BadRequestException(error);

        }

    }
}

