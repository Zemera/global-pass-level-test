import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';
import { Book } from './entities/book.entity';
import { BaseService } from './services/base.service';

@Injectable()
export class BookService extends BaseService<Book, CreateBookDto, UpdateBookDto>{
    constructor(
        @InjectRepository(Book)
        protected readonly repo: Repository<Book>
    ) {
        super(repo)
    }

    findAll(): Promise<Book[]> {
        return this.repo.find({
            relations:
            {
                author: true,
                lang: true
            }
        })
    }

}
