import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'glo-book-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCreateModalFormComponent  {

  action!: string;
  dialogTitle: string = "Message from " ;

  /**
   * Constructor
   *
   * @param {MatDialogRef<BookCreateModalFormComponent>} matDialogRef
   * @param _data
   * @param {FormBuilder} _formBuilder
   */
  constructor(
      public matDialogRef: MatDialogRef<BookCreateModalFormComponent>,
      @Inject(MAT_DIALOG_DATA) private _data: any,
      private _formBuilder: FormBuilder
  ) {
      // Set the defaults      
  }


}
