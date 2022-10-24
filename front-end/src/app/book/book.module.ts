import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BookComponent } from './book.component';
import { Routes, RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { BookCreateModalFormComponent } from './book-create-form/book-create-form.component';
import { ListBookComponent } from './list-book/book-list.component';
import { FilterPropretyBookValue } from './list-book/filterBookValue.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { BookDetailsComponent } from './book-details/book-details.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


const routes: Routes = [
    {
        path: '**',
        component: BookComponent,
    },
    {
        path: '',
        component: BookComponent,
    }
];

@NgModule({

    declarations: [
        ListBookComponent,
        BookComponent,
        BookCreateModalFormComponent,
        FilterPropretyBookValue,
        BookDetailsComponent
    ],

    imports: [
        CommonModule,
        MatChipsModule,
        MatAutocompleteModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatSelectModule,
        MatSortModule,
        MatGridListModule,
        MatListModule,
        MatPaginatorModule,
        ScrollingModule,
        ReactiveFormsModule, 
        FormsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatRadioModule
    ],
    providers: [],
    entryComponents: [
        BookCreateModalFormComponent,
    ]
})
export class BookModule {
}
