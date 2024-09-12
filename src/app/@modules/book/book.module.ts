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

@NgModule({
  declarations: [BookListComponent, BookDetailComponent],
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
  ],
})
export class BookModule {}
