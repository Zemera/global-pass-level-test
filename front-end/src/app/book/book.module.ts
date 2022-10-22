import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatSortModule} from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';


import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseConfirmDialogModule, FuseSidebarModule} from '@fuse/components';
import {HashveModule} from 'app/components/hashve.module';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {ListMessageComponent} from './list-book/list-message.component';
import {MessageComponent} from './book.component';
import {Routes, RouterModule} from '@angular/router';
import {MessageModuleService} from '../orm/services/book.service';
import {MessageService} from '../../../bussiness/services/message.service';
import {MessageFormDialogComponent} from './book-form/book-form.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';


const routes: Routes = [
    {
        path: '**',
        component: MessageComponent,
        resolve: {
            messages: MessageModuleService
        }
    }
];

@NgModule({
    declarations: [ListMessageComponent, MessageComponent, MessageFormDialogComponent],
    imports: [
        CommonModule,
        AngularEditorModule,
        RouterModule.forChild(routes),
        HashveModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        MatSelectModule,
        MatSortModule,
        MatGridListModule,
        TranslateModule,
        MatListModule,
        FuseConfirmDialogModule,
        FuseSharedModule,
        ScrollingModule
    ],
    providers: [
        MessageService,
        MessageModuleService
    ],
    exports: [
        MessageComponent
    ],
    entryComponents: [
        MessageFormDialogComponent,
    ]
})
export class MessageModule {
}
