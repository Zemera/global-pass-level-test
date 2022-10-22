import { Component, OnInit } from '@angular/core';
import { MessageModuleService } from '../orm/services/book.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageType } from '../../../bussiness/model/Enum/MessageType';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  animations: fuseAnimations
})
export class MessageComponent implements OnInit {
    typeMessage: any = "";
    sortFormGroup : FormGroup;
    _messageType = MessageType;

  constructor(
      private messageModuleService: MessageModuleService,
      private _fuseSidebarService: FuseSidebarService,
      private _matDialog: MatDialog) {
      let date = new Date();
      this.sortFormGroup = new FormGroup({
          fromDate : new FormControl(new Date(date.getFullYear(), date.getMonth(), 1)),
          toDate :new FormControl(date)
      });
  }

  ngOnInit() {
      this.messageModuleService.onFilterByTypeChanged.next(this.typeMessage);
  }



  sortByDate () :void{
   let toDate = new Date(this.sortFormGroup.get('toDate').value); 
   toDate.setHours(23,59,59);
   
   this.messageModuleService.getMessagesBetweenDate(
     (new Date(this.sortFormGroup.get('fromDate').value).toISOString()),
     (toDate.toISOString()))
  }

  sortByType() :void{
    this.messageModuleService.onFilterByTypeChanged.next(this.typeMessage);
  }

}
