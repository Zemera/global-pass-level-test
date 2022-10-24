import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLanguageDto, UpdateLanguageDto } from './dto/language.dto';
import { Language } from './entities/language.entity';
import { BaseService } from './services/base.service';

@Injectable()
export class LanguageService extends BaseService<Language, CreateLanguageDto, UpdateLanguageDto>{
    constructor(
        @InjectRepository(Language)
        protected readonly repo: Repository<Language>
    ) {
        super(repo)
    }

    
}
