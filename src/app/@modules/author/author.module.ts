import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthorRoutingModule } from "./author-routing.module";
import { AuthorDetailComponent } from './components/author-detail/author-detail.component';
import { AuthorListComponent } from './components/author-list/author-list.component';

@NgModule({
    declarations: [
        AuthorListComponent,
        AuthorDetailComponent
  ],
    imports: [
        RouterModule,
        AuthorRoutingModule
    ],
  })
  export class AuthorModule {
  
  }