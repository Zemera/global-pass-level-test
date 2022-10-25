import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { Book } from "../models/book.model";
import { BookService } from "./book.service";


describe('BookService with httpService', () => {
    let service: BookService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [BookService]
        });
        service = TestBed.inject(BookService);
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

    });

    // Test service create new book 
    it('#create should create new book',
        (done: DoneFn) => {
            const book:any = {
                author: "GLOBALPLUS-TEST-BOOK-AUTHOR_NAME",
                description: 'GLOBALPLUS-TEST-BOOK-DESCRIPTION',
                genre: 'GLOBALPLUS-TEST-BOOK-GENRE',
                lang: 'GLOBALPLUS-TEST-BOOK-BOOK-LANGUAGE' ,
                pageCount: 250,
                title: 'GLOBALPLUS-TEST-BOOK-TITLE',
            }
            service.create(book).subscribe(
                {
                    next: newBook => {
                        newBook.author = (newBook.author as any).fullName
                        newBook.lang = (newBook.lang as any).name
                        service.delete(newBook.id + '').subscribe()
                        delete newBook.id;
                        expect(newBook).toEqual(book);
                        done()
                    },
                    error: done.fail,

                })
        })

    // test if service get the list of book
    it('#create should get a list of books',
        (done: DoneFn) => {
            const book = {
                author: ("GLOBALPLUS-TEST-BOOK-AUTHOR_NAME" as any),
                description: 'GLOBALPLUS-TEST-BOOK-DESCRIPTION',
                genre: 'GLOBALPLUS-TEST-BOOK-GENRE',
                lang: ('GLOBALPLUS-TEST-BOOK-BOOK-LANGUAGE' as any),
                pageCount: 250,
                title: 'GLOBALPLUS-TEST-BOOK-TITLE',
            }
            service.create(book).subscribe(
                {
                    next: newBook => {
                        service.list().subscribe(
                            {
                                next: books => {
                                    service.delete(newBook.id + '').subscribe()
                                    delete newBook.id;
                                    console.log(books)
                                    // expect(books.includes(new Book(newBook))).toEqual(true);
                                    done()
                                },
                                error: done.fail,
                            }
                        )
                    },
                    error: error => {
                        console.log(error)
                        done.fail(error.message)
                    },

                })
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