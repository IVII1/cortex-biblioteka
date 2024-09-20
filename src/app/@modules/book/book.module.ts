import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookRoutingModule } from './book-routing.module';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PageHeaderComponent } from '../../@shared/page-header/page-header.component';
import { CommonModule } from '@angular/common';
import { BookStatsComponent } from './components/book-stats/book-stats.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BookBorrowComponent } from './components/book-borrow/book-borrow.component';
import { BookReturnComponent } from './components/book-return/book-return.component';
import { BookReserveComponent } from './components/book-reserve/book-reserve.component';
import { BookDiscardComponent } from './components/book-discard/book-discard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { PaginationComponent } from '../../@shared/pagination/pagination.component';

@NgModule({
  declarations: [
    BookListComponent,
    BookDetailComponent,
    BookBorrowComponent,
    BookReturnComponent,
    BookReserveComponent,
    BookDiscardComponent,
  ],

  providers: [provideNativeDateAdapter()],
  imports: [
    RouterModule,
    BookRoutingModule,
    MatTabsModule,
    PageHeaderComponent,
    CommonModule,
    BookStatsComponent,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    PaginationComponent,
  ],
})
export class BookModule {}
