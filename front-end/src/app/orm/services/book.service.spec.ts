import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { Book } from "../models/book.model";
import { BookService } from "./book.service";


describe('#BookService', () => {
    const books: Book[] = [
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
            author: { fullName: 'sergey krisanov', id: 2 },
            lang: { name: 'ru', id: 3 },
            pageCount: 100,
            title: 'the mindset of lenin',
            id: 2
        }),
        new Book({
            description: 'HULO',
            genre: 'mind',
            author: { fullName: 'sergey krisanov', id: 2 },
            lang: { name: 'ru', id: 3 },
            pageCount: 100,
            title: 'the mindset of lenin tome 2',
            id: 3
        }),
    ];

    let service: BookService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [{
                provide: BookService,
                useValue: {
                    list: () => of(books),
                    create: (book: any) => of(book)
                }

            }]
        });
        service = TestBed.inject(BookService);
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

    });

    // Test service create new book 
    it('#BookService  должен создать новую книгу',
        (done: DoneFn) => {
            const book: any = {
                author: "GLOBALPLUS-TEST-BOOK-AUTHOR_NAME",
                description: 'GLOBALPLUS-TEST-BOOK-DESCRIPTION',
                genre: 'GLOBALPLUS-TEST-BOOK-GENRE',
                lang: 'GLOBALPLUS-TEST-BOOK-BOOK-LANGUAGE',
                pageCount: 250,
                title: 'GLOBALPLUS-TEST-BOOK-TITLE',
            }
            service.create(book).subscribe(
                {
                    next: newBook => {
                        newBook.author = (newBook.author as any).fullName
                        newBook.lang = (newBook.lang as any).name
                        expect(newBook).toEqual(book);
                        done()
                    },
                    error: done.fail,

                })
        })

    // test if service get the list of book
    it('#должен получить список книг',
        (done: DoneFn) => {
            const book = {
                author: ("GLOBALPLUS-TEST-BOOK-AUTHOR_NAME" as any),
                description: 'GLOBALPLUS-TEST-BOOK-DESCRIPTION',
                genre: 'GLOBALPLUS-TEST-BOOK-GENRE',
                lang: ('GLOBALPLUS-TEST-BOOK-BOOK-LANGUAGE' as any),
                pageCount: 250,
                title: 'GLOBALPLUS-TEST-BOOK-TITLE',
            }
            service.list().subscribe(
                {
                    next: listbooks => {
                        expect(books.length).toBe(listbooks.length);
                        done()
                    },
                    error: done.fail,
                }
            )
        })


    //         })
    //     })


    // it('#getObservableValue should return value from observable',
    //     (done: DoneFn) => {
    //         service.getObservableValue().subscribe(value => {
    //             expect(value).toBe('observable value');
    //             done();
    //         });
    //     });

    // it('#getPromiseValue should return value from a promise',
    //     (done: DoneFn) => {
    //         service.getPromiseValue().then(value => {
    //             expect(value).toBe('promise value');
    //             done();
    //         });
    //     });
})