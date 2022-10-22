import { IAuthor } from "./author.interface";
import { ILanguage } from "./language.interface";

export interface IBook {
    id?: number;
    title: string; // название 
    author: IAuthor | number; // автор 
    description: string; //описание 
    pageCount: number; // число страниц  
    lang: ILanguage | number; // язык 
    genre: string; //  жанр  
}

export class Book implements IBook {
    id?: number | undefined;
    title: string;
    author: number | IAuthor;
    description: string;
    pageCount: number;
    lang: number | ILanguage;
    genre: string;

    constructor(book: IBook) {
        this.author = book.author;
        this.title = book.title;
        this.description = book.description;
        this.pageCount = book.pageCount;
        this.lang = book.lang;
        this.genre = book.genre;
        if (book.id) this.id = book.id
    }
}


