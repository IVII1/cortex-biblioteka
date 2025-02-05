import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthorRoutingModule } from './author-routing.module';
import { AuthorDetailComponent } from './components/author-detail/author-detail.component';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { CommonModule } from '@angular/common';
import { AuthorEditAddComponent } from './components/author-edit-add/author-edit-add.component';
import { PageHeaderComponent } from '../../@shared/page-header/page-header.component';
import { SearchAddNewComponent } from '../../@shared/search-add-new/search-add-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    AuthorListComponent,
    AuthorDetailComponent,
    AuthorEditAddComponent,
  ],
  imports: [
    RouterModule,
    AuthorRoutingModule,
    CommonModule,
    PageHeaderComponent,
    SearchAddNewComponent,
    ReactiveFormsModule,
    CKEditorModule,
  ],
})
export class AuthorModule {}
