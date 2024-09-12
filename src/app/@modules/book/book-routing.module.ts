import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookResolver } from './resolvers/book.resolver';
import { BookEditAddComponent } from './components/book-edit-add/book-edit-add.component';

const routes = [
  {
    path: '',
    component: BookListComponent,
  },
  {
    path: 'new',
    component: BookDetailComponent,
  },
  {
    path: 'edit/:id',
    component: BookEditAddComponent,
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
