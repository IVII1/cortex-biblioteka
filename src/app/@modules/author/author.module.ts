import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthorRoutingModule } from './author-routing.module';
import { AuthorDetailComponent } from './components/author-detail/author-detail.component';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { AuthorNewComponent } from './components/author-new/author-new.component';
import { AuthorRowComponent } from './components/author-row/author-row.component';
import { AuthorHeaderComponent } from './components/author-header/author-header.component';
import { TableHeadComponent } from './components/table-head/table-head.component';
import { SearchAddNewComponent } from './components/search-add-new/search-add-new.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    AuthorListComponent,
    AuthorDetailComponent,
    AuthorNewComponent,
    AuthorRowComponent,
    AuthorHeaderComponent,
    TableHeadComponent,
    SearchAddNewComponent,
    PaginationComponent,
  ],
  imports: [RouterModule, AuthorRoutingModule],
})
export class AuthorModule {}
