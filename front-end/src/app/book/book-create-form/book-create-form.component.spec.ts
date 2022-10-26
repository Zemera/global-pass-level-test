import { ScrollingModule } from "@angular/cdk/scrolling";
import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatRippleModule } from "@angular/material/core";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";
import { BookService } from "src/app/orm/services/book.service";
import { BookDetailsComponent } from "../book-details/book-details.component";
import { BookCreateModalFormComponent } from "./book-create-form.component";

describe('BookCreateModalFormComponent', () => {
    let component: BookCreateModalFormComponent;
    let fixture: ComponentFixture<BookCreateModalFormComponent>;

    const book = {
        description: 'first description of book',
        genre: 'fiction',
        author: 'francis',
        lang: 'french',
        pageCount: 250,
        title: 'le grand bazar',
        id: 1
    };
    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [BookCreateModalFormComponent, BookDetailsComponent],
            imports: [
                HttpClientModule,
                MatChipsModule,
                MatAutocompleteModule,
                BrowserAnimationsModule,
                MatButtonModule,
                MatFormFieldModule,
                MatIconModule,
                MatInputModule,
                MatRippleModule,
                MatSelectModule,
                MatGridListModule,
                MatListModule,
                ScrollingModule,
                ReactiveFormsModule,
                FormsModule,
                MatDialogModule,
            ],
            providers: [BookService
                , {
                    provide: MatDialogRef, useValue: {
                        close: (data: any) => { return data },
                        afterClosed: () => { return of(book) }
                    }
                },
                { provide: MAT_DIALOG_DATA, useValue: [] },]
        }).compileComponents();

    });

    beforeEach(async () => { // 3
        fixture = TestBed.createComponent(BookCreateModalFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('#BookCreateModalFormComponent should create', () => {
        expect(component).toBeTruthy();
    });

    it('#BookCreateModalFormComponent тест- заполнить форму и вернуть книжный объект ', (done: DoneFn) => {
        const controls = component.addCusForm.controls;
        controls['title'].setValue(book.title)
        controls['lang'].setValue(book.lang)
        controls['author'].setValue(book.author)
        controls['genre'].setValue(book.genre)
        controls['pageCount'].setValue(book.pageCount)
        controls['description'].setValue(book.description)
        component.book = (null as any);
        fixture.detectChanges();
        const btn = fixture.debugElement.query(By.css('#submitBtn'));
        btn.nativeElement.click()

        expect(component.addCusForm.valid).toBe(true)
        component.dialogRef.afterClosed().subscribe(object => {
            expect(object).toEqual(book)
            done()
        })
    });

    it('#BookCreateModalFormComponent тест-должна возвращать ошибки обязательных полей формы  ', async () => {

        const controls = component.addCusForm.controls;
        const title = controls['title']
        const genre = controls['genre']

        component.book = (null as any);
        fixture.detectChanges()

        const btn = fixture.debugElement.query(By.css('#submitBtn'))

        genre.setValue('')
        title.setValue('')
        btn.nativeElement.click()

        fixture.detectChanges()

        const genreErrorElement = (fixture.debugElement.query(By.css('#genreError'))) ;
        const titleErrorElement = (fixture.debugElement.query(By.css('#titleError')));

        expect(component.addCusForm.valid).toBe(false)
        expect(titleErrorElement.nativeElement.innerHTML.trim()).toBe('Пожалуйста, введите название')
        expect(genreErrorElement.nativeElement.innerHTML.trim()).toBe('Пожалуйста, укажите жанр')
    });

})