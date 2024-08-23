import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BookRoutingModule } from "./book-routing.module";
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { IssuedBooksComponent } from './components/issued-books/issued-books.component';

@NgModule({
    declarations: [
        BookListComponent,
        BookDetailComponent,
        IssuedBooksComponent
  ],
    imports: [
        RouterModule,
        BookRoutingModule
    ],
  })
  export class BookModule {
  
  }