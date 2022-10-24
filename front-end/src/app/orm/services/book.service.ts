import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAuthor } from '../models/author.interface';
import { Book } from '../models/book.model';
import { BaseService } from './service.base';

@Injectable({
    providedIn: 'root'
})
export class BookService extends BaseService<Book> {
    public onNewBook: Subject<Book>
    books: Book[] = [
        new Book({
            description: 'first description of book',
            genre: 'fiction',
            author: { fullName: 'francis', id: 1 },
            lang: { name: 'fr', id: 1 },
            pageCount: 250,
            title: 'le grand bazar',
            id: 1
        }),
        new Book({
            description: 'the minset of russian president',
            genre: 'mind',
            author: { fullName: 'calaboro', id: 2 },
            lang: { name: 'ru', id: 3 },
            pageCount: 100,
            title: 'the mindset of poutine',
            id: 2
        }),
        new Book({
            description: 'HULO',
            genre: 'mind',
            author: { fullName: 'calaboro', id: 2 },
            lang: { name: 'ru', id: 3 },
            pageCount: 100,
            title: 'the mindset of poutine',
            id: 3
        }),
    ]

    authors: IAuthor[] = [
        { fullName: "essam", id: 1 },
        { fullName: "mvoc", id: 1 },
        { fullName: "francis", id: 2 },
        { fullName: "noel", id: 3 },
    ]
    constructor(protected override httpClient: HttpClient) {
        super(httpClient, environment.apiHost, environment.bookEndPoint)
        this.onNewBook = new Subject<Book>()
    }

    public override list(): Observable<Book[]> {
        return of(this.books)
    }

    public authorList(): Observable<IAuthor[]> {
        return of(this.authors)
    }

    public override create(item: Book): Observable<Book> {
        item.id = Math.random();
        item.author = (this.authors.find(author => author.fullName == (item.author as any)) as IAuthor)
        return of(item);
    }


}
