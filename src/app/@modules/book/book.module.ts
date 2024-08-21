import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BookRoutingModule } from "./book-routing.module";
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookListComponent } from './components/book-list/book-list.component';

@NgModule({
    declarations: [
        BookListComponent,
        BookDetailComponent
  ],
    imports: [
        RouterModule,
        BookRoutingModule
    ],
  })
  export class BookModule {
  
  }