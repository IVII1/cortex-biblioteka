import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BookDetailComponent } from "./components/book-detail/book-detail.component";
import { BookListComponent } from "./components/book-list/book-list.component";

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
    path: ':id',
    component: BookDetailComponent,
    // resolve: {
    //   Book: BookResolver,
    // },
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
  })
export class BookRoutingModule {}