import { Component, Input } from '@angular/core';
import { Book, IBook } from 'src/app/orm/models/book.model';


@Component({
  selector: 'glo-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent {

  @Input() book!:Book;
  constructor(

  ) {
  }
}
