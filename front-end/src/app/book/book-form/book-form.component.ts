import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Message } from 'app/bussiness/model/message.model';
import { environment } from '../../../../../environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'glo-book-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageFormDialogComponent  {

  action!: string;
  message: Message;
  dialogTitle: string = "Message from " ;
  apiHost: string = environment.apihost; 

  /**
   * Constructor
   *
   * @param {MatDialogRef<MessageFormDialogComponent>} matDialogRef
   * @param _data
   * @param {FormBuilder} _formBuilder
   */
  constructor(
      public matDialogRef: MatDialogRef<MessageFormDialogComponent>,
      @Inject(MAT_DIALOG_DATA) private _data: any,
      //private _formBuilder: FormBuilder
  ) {
      // Set the defaults
      this.dialogTitle +=  _data.message.from || _data.message.name ;
      this.message = _data.message ;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------


}
