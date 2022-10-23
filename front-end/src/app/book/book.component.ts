import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { BookService } from '../orm/services/book.service';


@Component({
  selector: 'glo-book-message',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  typeMessage: any = "";
  sortFormGroup: FormGroup;

  constructor(
    private bookService: BookService,
    private _matDialog: MatDialog) {
    let date = new Date();
    this.sortFormGroup = new FormGroup({
      fromDate: new FormControl(new Date(date.getFullYear(), date.getMonth(), 1)),
      toDate: new FormControl(date)
    });
  }

  ngOnInit() {
    // this.messageModuleService.onFilterByTypeChanged.next(this.typeMessage);
  }



  sortByDate(): void {
    // let toDate = new Date(this.sortFormGroup.get('toDate').value);
    // toDate.setHours(23, 59, 59);

    // this.messageModuleService.getMessagesBetweenDate(
    //   (new Date(this.sortFormGroup.get('fromDate').value).toISOString()),
    //   (toDate.toISOString()))
  }

  sortByType(): void {
    // this.messageModuleService.onFilterByTypeChanged.next(this.typeMessage);
  }

}
