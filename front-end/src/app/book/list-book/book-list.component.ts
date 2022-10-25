import { AfterViewInit, Component, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { IAuthor } from 'src/app/orm/models/author.interface';
import { Book, IBook } from 'src/app/orm/models/book.model';
import { ILanguage } from 'src/app/orm/models/language.interface';
import { BookService } from 'src/app/orm/services/book.service';
import { BookCreateModalFormComponent } from '../book-create-form/book-create-form.component';

@Component({
    selector: 'glp-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ListBookComponent implements AfterViewInit, OnDestroy {

    displayedColumns: string[] = ['title', 'author', 'pageCount', 'lang', 'genre'];
    dataSource: MatTableDataSource<Book>;
    books: Book[] = [];
    unsubscribers: Subscription[] = []
    filterForm!: FormGroup ;

    public dialogRef!: MatDialogRef<BookCreateModalFormComponent>

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        public bookService: BookService,
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
    ) {
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.books);
        // Initialize filter form  
        this.initFilterForm()
        // Set filters 
        this.dataSource.filterPredicate = ((data, filter: any) => {
            const filterGenre = !filter.genre ||
                data.genre === filter.genre;
            const filterPage = (!filter.from && !filter.to) ||
                this._checkFilterPageCount(filter.from, filter.to, data)
            const filterLang = (!(filter.langs.length > 0)) ||
                this._checkFilterlangs(filter.langs, data);
            const filterAuthors = (!(filter.authors.length)) ||
                this._checkFilterAuthors(filter.authors, data);
            const filterSearch = !filter.keyword ||
                this._seacrh(filter.keyword, data);
            return filterGenre && filterSearch && filterPage && filterLang && filterAuthors;
        });


        this.unsubscribers.push(this.bookService.list().subscribe(books => {
            this.books = books;
            this.dataSource.data = books
        }))
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    initFilterForm() {
        this.filterForm = this.formBuilder.group({
            keyword: [null],
            genre: [null],
            langs: [[]],
            authors: [[]],
            from: [null],
            to: [null],
        })

        this.filterForm.valueChanges.subscribe((value) => {
            const filter = { ...value, };
            this.applyFilter(filter)
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    _checkFilterPageCount(from: number, to: number, book: Book): boolean {
        return book.pageCount >= from && book.pageCount <= to
    }

    _checkFilterlangs(langs: string[], book: Book): boolean {

        return langs.includes((book.lang as ILanguage).name)
    }

    _checkFilterAuthors(authors: string[], book: Book): boolean {
        return authors.includes((book.author as IAuthor).fullName)
    }

    _seacrh(filter: string, book: Book): boolean {
        filter = filter.trim().toLowerCase()
        return book.title.includes(filter) || book.description.includes(filter)
    }

    openDialog(book?: IBook): void {
        this.dialogRef = this.dialog.open(BookCreateModalFormComponent, {
            width: '640px', disableClose: true,
            data: book
        });
        this.dialogRef.afterClosed().subscribe(data => {
            if (data) {
                this.unsubscribers.push(this.bookService.create(data).subscribe(newBook => {
                    this.books.push(newBook);
                    this.dataSource.data = this.books;
                }))
            }
        })
    }

    ngOnDestroy(): void {
        this.unsubscribers.forEach(sub => sub.unsubscribe())
    }

}
