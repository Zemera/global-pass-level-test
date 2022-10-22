import {Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {merge, Observable, Subject} from 'rxjs';
import {MessageModuleService} from '../../orm/services/book.service';
import {MessageType} from '../../../../bussiness/model/Enum/MessageType';
import {MatDialog} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {DataSource} from '@angular/cdk/collections';
import {fuseAnimations} from '@fuse/animations';
import {Message} from 'app/bussiness/model/message.model';
import {map, takeUntil} from 'rxjs/operators';
import {MessageFormDialogComponent} from '../book-form/book-form.component';

@Component({
    selector: 'app-list-message',
    templateUrl: './list-message.component.html',
    styleUrls: ['./list-message.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ListMessageComponent implements OnInit {
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    displayedColumns = ['from', 'to', 'type', 'createdAt'];
    dataSource: FilesDataSource | null;
    messages: Array<Message> = [];
    checkboxes: {};
    _messageType: any = MessageType;

    selectedContacts: any[];
    dialogRef: any;


    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ContactsService} _contactsService
     * @param {MatDialog} _matDialog
     */

    constructor(
        private _messageModuleService: MessageModuleService,
        public _matDialog: MatDialog
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        /*this._messageModuleService.onMessageChanged.subscribe(data => {
            this.messages = data;
            this.checkboxes = {};
            this.messages.map(item => {
                this.checkboxes[item._id] = false;
            });
        });*/
    }

    ngOnInit(): void {
        this.dataSource = new FilesDataSource(this._messageModuleService, this.sort);

        this._messageModuleService.onMessageChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(messages => {
                this.messages = messages;
                this.checkboxes = {};
                messages.map(message => {
                    this.checkboxes[message._id] = false;
                });
            });


        /*this._contactsService.onFilterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._contactsService.deselectContacts();
            });*/
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    editMessage(message): void {
        this.dialogRef = this._matDialog.open(MessageFormDialogComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                message: message,
            }
        });


        // active message new ==> false
        if (message.new) {
            setTimeout(() => {
                message.new = false;
                this._messageModuleService.updateMessage(message._id, message);
            }, 5000);

        }


    }

}


export class FilesDataSource extends DataSource<any> {
    /**
     * Constructor
     *
     * @param {MessageModuleService} MessageModuleService
     */
    constructor(
        private  _messageModuleService: MessageModuleService,
        private _matSort: MatSort,
    ) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        const displayDataChanges = [
            this._messageModuleService.onMessageChanged,
            this._messageModuleService.onFilterChanged,
            this._messageModuleService.onFilterByTypeChanged,
            this._matSort.sortChange
        ];
        return merge(...displayDataChanges).pipe(
            map(() => {
                let data = this._messageModuleService.messages;

                const fiType = this._messageModuleService.filteredType;
               data = data.filter(item => fiType === null  ? true : item.type === fiType);

                data = this.sortData(data);

                return data;
            })
        );
    }

    sortData(data): any[] {
        if (!this._matSort.active || this._matSort.direction === '') {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';
            switch (this._matSort.active) {
                case 'from':
                    [propertyA, propertyB] = [a.from, b.from];
                    break;
                case 'to':
                    [propertyA, propertyB] = [a.to, b.to];
                    break;
                case 'createdAt':
                    [propertyA, propertyB] = [a.createdAt, b.createdAt];
                    break;

            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }
}