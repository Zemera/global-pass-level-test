import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book.model';
import { BaseService } from './service.base';

@Injectable()
export class BookService extends BaseService<Book> {

    constructor(protected override httpClient: HttpClient) {
        super(httpClient, environment.apiHost, environment.bookEndPoint)
    }

}
