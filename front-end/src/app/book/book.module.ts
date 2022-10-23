import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BookComponent } from './book.component';
import { Routes, RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { BookCreateModalFormComponent } from './book-create-form/book-create-modal-form.component';
import { ListBookComponent } from './list-book/book-list.component';


const routes: Routes = [
    {
        path: '**',
        component: BookComponent,
    }
];

@NgModule({
    
    declarations: [
        ListBookComponent,
        BookComponent,
        BookCreateModalFormComponent
    ],

    imports: [
        CommonModule,
        RouterModule.forChild(routes),
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
        MatListModule,
        ScrollingModule
    ],
    providers: [],
    entryComponents: [
        BookCreateModalFormComponent,
    ]
})
export class MessageModule {
}
