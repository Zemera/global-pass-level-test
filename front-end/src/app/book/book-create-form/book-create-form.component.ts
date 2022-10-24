import { Component, ElementRef, Inject, ViewChild, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Observable } from 'rxjs';
import { IAuthor } from 'src/app/orm/models/author.interface';
import { IBook } from 'src/app/orm/models/book.model';
import { BookService } from 'src/app/orm/services/book.service';
import { languages } from './list-languages';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


@Component({
  selector: 'glo-book-form',
  templateUrl: './book-create-form.component.html',
  styleUrls: ['./book-create-form.component.scss'],
})
export class BookCreateModalFormComponent {

  public breakpoint!: number; // Breakpoint observer code
  public addCusForm!: FormGroup;
  wasFormChanged = false;
  languages = languages;
  $authors: Observable<IAuthor[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BookCreateModalFormComponent>,
    @Inject(MAT_DIALOG_DATA) public book: IBook,
    public bookService: BookService,
  ) {
    this.$authors = bookService.authorList()
  }

  public ngOnInit(): void {
    this.addCusForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      pageCount: [null, [Validators.required]],
      genre: [null, [Validators.required]],
      author: [null, [Validators.required]],
      // fruitCtrl: [, [Validators.required]],
      lang: [languages, [Validators.required]],
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }

  public onAddCus(): void {
    this.markAsDirty(this.addCusForm);
  }

  submitData(): void {
    if (this.addCusForm.valid)
      this.dialogRef.close(this.addCusForm.getRawValue())
  }

  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }

  formChanged() {
    this.wasFormChanged = true;
  }

  addAuthor(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.addCusForm.controls['author'].setValue(value)
    }

    // event.chipInput!.clear();

    // this.addCusForm.controls['author'].setValue(null);
  }

  removeAuthor(): void {
    this.addCusForm.controls['author'].setValue(null);
    this.fruitInput.nativeElement.value = '';
  }

  selectedAuthor(event: MatAutocompleteSelectedEvent): void {
    this.fruitInput.nativeElement.value = event.option.viewValue;
    this.addCusForm.controls['author'].setValue(event.option.viewValue);
  }

  get authCtlrValue() {
    return this.addCusForm.controls['author'].value;
  }
}
