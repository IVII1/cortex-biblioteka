import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthorRoutingModule } from './author-routing.module';
import { AuthorDetailComponent } from './components/author-detail/author-detail.component';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { AuthorRowComponent } from './components/author-row/author-row.component';
import { TableHeadComponent } from './components/table-head/table-head.component';
import { SearchAddNewComponent } from '../../@shared/search-add-new/search-add-new.component';
import { PaginationComponent } from '../../@shared/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from 'src/app/@shared/page-header/page-header.component';

@NgModule({
  declarations: [
    AuthorListComponent,
    AuthorDetailComponent,
    AuthorRowComponent,
    TableHeadComponent,
    SearchAddNewComponent,
    PaginationComponent,
    PageHeaderComponent,
  ],
  imports: [RouterModule, AuthorRoutingModule, CommonModule],
})
export class AuthorModule {}
