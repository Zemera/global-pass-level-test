import { ScrollingModule } from "@angular/cdk/scrolling";
import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatRippleModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BookService } from "src/app/orm/services/book.service";
import { BookCreateModalFormComponent } from "./book-create-form.component";

describe('BookListComponent', () => {
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
            declarations: [BookCreateModalFormComponent],
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
            providers: [BookService]
        }).compileComponents();

    });

    beforeEach(() => { // 3
        fixture = TestBed.createComponent(BookCreateModalFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('#BookListComponent should create', () => {
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
        const btn = (fixture.debugElement.nativeElement.querySelector('#submitBtn') as HTMLButtonElement);
        btn.click()
        expect(component.addCusForm.valid).toBe(true)
        component.dialogRef.afterClosed().subscribe(object => {
            expect(object).toEqual(book)
            
            done()
        })
    });

    it('#BookListComponent тест-должна возвращать ошибки обязательных полей формы  ', async () => {

        const controls = component.addCusForm.controls;
        const title = controls['title']
        const genre = controls['genre']
        const genreErrorElement = (fixture.debugElement.nativeElement.querySelector('#genreError'));
        const titleErrorElement = (fixture.debugElement.nativeElement.querySelector('#titleError'));
        const btn = (fixture.debugElement.nativeElement.querySelector('#submitBtn') as HTMLButtonElement);

        genre.setValue('')
        title.setValue('')
        btn.click()

        expect(component.addCusForm.valid).toBe(false)
        expect(titleErrorElement.innerHTML).toBe('Пожалуйста, введите название')
        expect(genreErrorElement.innerHTML).toBe('Пожалуйста, укажите жанр')
    });

})