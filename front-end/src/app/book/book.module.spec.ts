import { ScrollingModule } from "@angular/cdk/scrolling";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule, FormsModule, FormGroup } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
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
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { BookCreateModalFormComponent } from "./book-create-form/book-create-form.component";
import { BookDetailsComponent } from "./book-details/book-details.component";
import { of } from "rxjs";
import { ListBookComponent } from "./list-book/book-list.component";
import { IAuthor } from "../orm/models/author.interface";
import { ILanguage } from "../orm/models/language.interface";
import { FilterPropretyBookValue } from "./list-book/filterBookValue.pipe";
import { By } from "@angular/platform-browser";

describe('BookModule', () => {
    let listBookComponent: ListBookComponent;
    let bookCreateModalFormComponent: BookCreateModalFormComponent;
    let bookDetailsComponent: BookDetailsComponent;
    let fixtureListBookComponent: ComponentFixture<ListBookComponent>;
    let fixtureBookCreateModalFormComponent: ComponentFixture<BookCreateModalFormComponent>;
    let fixtureBookDetailsComponent: ComponentFixture<BookDetailsComponent>;
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
            imports: [
                CommonModule,
                MatChipsModule,
                MatAutocompleteModule,
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
                BrowserAnimationsModule
            ],
            providers: [{
                provide: BookService,
                useValue: {
                    list: () => of(books),
                    create: (book: any) => of(book),
                    authorList: () => of([])
                },
            },
            {
                provide: MatDialogRef, useValue: {
                    close: (data: any) => { return data },
                    afterClosed: () => { return of(books[0]) }
                },
            },
            { provide: MAT_DIALOG_DATA, useValue: [] }
            ],
            declarations: [
                ListBookComponent,
                BookCreateModalFormComponent,
                FilterPropretyBookValue,
                BookDetailsComponent
            ],
        }).compileComponents();


        fixtureListBookComponent = TestBed.createComponent(ListBookComponent);
        fixtureBookCreateModalFormComponent = TestBed.createComponent(BookCreateModalFormComponent)
        fixtureBookDetailsComponent = TestBed.createComponent(BookDetailsComponent)
        loader = TestbedHarnessEnvironment.loader(fixtureListBookComponent);

        listBookComponent = fixtureListBookComponent.componentInstance
        bookCreateModalFormComponent = fixtureBookCreateModalFormComponent.componentInstance
        bookDetailsComponent = fixtureBookDetailsComponent.componentInstance

        fixtureListBookComponent.detectChanges();
        fixtureBookCreateModalFormComponent.detectChanges();
        fixtureBookDetailsComponent.detectChanges();
    });

    it('#инициализация компонентов книжного модуля ', () => {
        expect(listBookComponent).toBeTruthy();
        expect(bookCreateModalFormComponent).toBeTruthy();
        expect(bookDetailsComponent).toBeTruthy();
    });

    it('#Интеграции книжного сервиса и компонента списка книг ', () => {
        expect(listBookComponent.books).toEqual(books)
    });

    it('#интеграция открыть диалог из списка книга компонент в список создать компонент ', () => {
        expect(bookCreateModalFormComponent.addCusForm).toBeInstanceOf(FormGroup)
        const addBtn = fixtureListBookComponent.debugElement.query(By.css('#add-button'))
        // Open dialog 
        addBtn.nativeElement.click()
        expect(bookCreateModalFormComponent.addCusForm).toBeInstanceOf(FormGroup)

    });

    it('#интеграционный тест передачи информации между компонентом диалога создания книги и компонентом списка книг', async () => {
        const addBtn = (fixtureListBookComponent.debugElement.nativeElement.querySelector('#add-button') as HTMLButtonElement);

        const controls = bookCreateModalFormComponent.addCusForm.controls;
        controls['title'].setValue(books[0].title)
        controls['lang'].setValue((books[0].lang as ILanguage).name)
        controls['author'].setValue((books[0].author as IAuthor).fullName)
        controls['genre'].setValue(books[0].genre)
        controls['pageCount'].setValue(books[0].pageCount)
        controls['description'].setValue(books[0].description)

        bookCreateModalFormComponent.book = (null as any)
        fixtureBookCreateModalFormComponent.detectChanges()
        const submit = (fixtureBookCreateModalFormComponent.debugElement.nativeElement.querySelector('#submitBtn') as HTMLButtonElement);
        // Open dialog 
        addBtn.click()
        // Submit form
        submit.click()

        spyOn(listBookComponent.dialog, 'open')
            .and
            .returnValue({ afterClosed: () => of(books) } as MatDialogRef<typeof listBookComponent>);

        const book = await Promise.all(listBookComponent.books.filter(e => e.title === books[0].title))
        expect(book.length).toBeGreaterThanOrEqual(1)
        
    });


})