import { NgModule } from "@angular/core";
import { AuthorDetailComponent } from './components/author-detail/author-detail.component';
import { AuthorListComponent } from './components/author-list/author-list.component';

@NgModule({
    declarations: [
        AuthorListComponent,
        AuthorDetailComponent
  ],
    imports: [],
  })
  export class AuthorModule {
  
  }