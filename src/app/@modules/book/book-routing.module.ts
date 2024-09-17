import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookResolver } from './resolvers/book.resolver';
import { BookEditAddComponent } from './components/book-edit-add/book-edit-add.component';
import { BookReserveComponent } from './components/book-reserve/book-reserve.component';
import { BookDiscardComponent } from './components/book-discard/book-discard.component';
import { BookReturnComponent } from './components/book-return/book-return.component';
import { BookBorrowComponent } from './components/book-borrow/book-borrow.component';

const routes = [
  {
    path: '',
    component: BookListComponent,
  },
  {
    path: 'new',
    component: BookEditAddComponent,
  },
  {
    path: 'edit/:id',
    component: BookEditAddComponent,
    resolve: { book: BookResolver },
  },
  {
    path: 'reserve/:id',
    component: BookReserveComponent,
    resolve: { book: BookResolver },
  },
  {
    path: 'borrow/:id',
    component: BookBorrowComponent,
    resolve: { book: BookResolver },
  },
  {
    path: 'return/:id',
    component: BookReturnComponent,
    resolve: { book: BookResolver },
  },
  {
    path: 'discard/:id',
    component: BookDiscardComponent,
    resolve: { book: BookResolver },
  },

  {
    path: ':id',
    component: BookDetailComponent,

    resolve: {
      book: BookResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class BookRoutingModule {}
