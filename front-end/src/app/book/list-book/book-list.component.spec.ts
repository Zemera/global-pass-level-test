import { ScrollingModule } from "@angular/cdk/scrolling";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Book } from "src/app/orm/models/book.model";
import { BookService } from "src/app/orm/services/book.service";
import { ListBookComponent } from "./book-list.component";
import { FilterPropretyBookValue } from "./filterBookValue.pipe";
import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTableHarness } from '@angular/material/table/testing';
import { IAuthor } from "src/app/orm/models/author.interface";
import { ILanguage } from "src/app/orm/models/language.interface";

describe('BookListComponent', () => {
    let component: ListBookComponent;
    let fixture: ComponentFixture<ListBookComponent>;
    let loader: HarnessLoader;

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
    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [ListBookComponent, FilterPropretyBookValue],
            imports: [
                HttpClientModule,
                MatChipsModule,
                MatAutocompleteModule,
                BrowserAnimationsModule,
                MatButtonModule,
                MatFormFieldModule,
                MatNativeDateModule,
                MatIconModule,
                MatInputModule,
                MatMenuModule,
                MatRippleModule,
                MatTableModule,
                MatSelectModule,
                MatSortModule,
                MatGridListModule,
                MatListModule,
                MatPaginatorModule,
                ScrollingModule,
                ReactiveFormsModule,
                FormsModule,
                MatDatepickerModule,
                MatDialogModule,
            ],
            providers: [BookService]
        }).compileComponents();

        fixture = TestBed.createComponent(ListBookComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


    it('#BookListComponent should create', () => {
        expect(component).toBeTruthy();
    });

    it('#BookListComponent should load  for a table', async () => {
        component.books = books;
        component.dataSource.data = books;
        const tables = await loader.getHarness(MatTableHarness);
        const rows = await tables.getRows()
        expect(rows.length).toBe(3);
    });

    it('#BookListComponent тест-поиск по названию и описанию', async () => {
        component.books = books;
        component.dataSource.data = books;
        component.initFilterForm()
        const tables = await loader.getAllHarnesses(MatTableHarness);
        const table = await loader.getHarness(MatTableHarness);
        component.filterForm.controls['keyword'].setValue(books[0].description)

        const firtRow = (await table.getRows())[0];
        const cells = await firtRow.getCells();
        const cellTexts = await parallel(() => cells.map(cell => cell.getText()));

        expect(tables.length).toBe(1);
        expect(cellTexts).toEqual([
            books[0].title,
            (books[0].author as IAuthor).fullName,
            `` + books[0].pageCount,
            (books[0].lang as ILanguage).name,
            books[0].genre
        ]);

    });

    it('#BookListComponent тест-фильтр по автору, языку, числу страниц, жанру ', async () => {
        component.books = books;
        component.dataSource.data = books;
        const tables = await loader.getAllHarnesses(MatTableHarness);
        const table = await loader.getHarness(MatTableHarness);
        
        // Set form filter
        component.initFilterForm()
        component.filterForm.controls['genre'].setValue(books[0].genre)
        component.filterForm.controls['langs'].setValue([(books[0].lang as ILanguage).name])
        component.filterForm.controls['authors'].setValue([(books[0].author as IAuthor).fullName])
        component.filterForm.controls['from'].setValue(1)
        component.filterForm.controls['to'].setValue(books[0].pageCount)
        
        const firtRow = (await table.getRows())[0];
        const cells = await firtRow.getCells();
        const cellTexts = await parallel(() => cells.map(cell => cell.getText()));

        expect(cellTexts).toEqual([
            books[0].title,
            (books[0].author as IAuthor).fullName,
            `` + books[0].pageCount,
            (books[0].lang as ILanguage).name,
            books[0].genre
        ]);

    });

})