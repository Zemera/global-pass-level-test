import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { IAuthor } from 'src/app/orm/models/author.interface';
import { Book } from 'src/app/orm/models/book.model';
import { BookService } from 'src/app/orm/services/book.service';

@Component({
    selector: 'app-list-message',
    templateUrl: './list-message.component.html',
    styleUrls: ['./list-message.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ListBookComponent implements AfterViewInit, OnDestroy {
    displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
    dataSource: MatTableDataSource<Book>;
    books: Book[] = [];
    unsubscribers: Subscription[] = []

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private bookService: BookService) {
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.books);
        this.unsubscribers.push(this.bookService.list().subscribe(books => { this.books = books }))
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    search(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;

        // Assing filter by title and description 
        this.dataSource.filterPredicate = (book: Book, filter: string) => {
            return book.title.includes(filter) || book.description.includes(filter)
        }
        this.applyFilter(filterValue)
    }

    setFilterType(value: string, proprety: any) {

        if (proprety === 'author')
            this.dataSource.filterPredicate = (book: Book, filter: string) => {
                return (book.author as IAuthor).fullName == filter
            }
        else
            this.dataSource.filterPredicate = (book: any, filter) => { return book[proprety] == filter }

        this.applyFilter(value)
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    ngOnDestroy(): void {
        this.unsubscribers.forEach(sub => sub.unsubscribe())
    }

}
