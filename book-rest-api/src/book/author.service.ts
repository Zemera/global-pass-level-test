import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto, UpdateAuthorDto } from './dto/author.dto';
import { Author } from './entities/author.entity';
import { BaseService } from './services/base.service';

@Injectable()
export class AuthorService extends BaseService<Author, CreateAuthorDto, UpdateAuthorDto>{
    constructor(
        @InjectRepository(Author)
        protected readonly repo: Repository<Author>
    ) {
        super(repo)
    }

    
}
