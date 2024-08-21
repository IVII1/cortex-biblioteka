import { NgModule } from "@angular/core";
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookListComponent } from './components/book-list/book-list.component';

@NgModule({
    declarations: [
        BookListComponent,
        BookDetailComponent
  ],
    imports: [],
  })
  export class BookModule {
  
  }