import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthorDetailComponent } from './components/author-detail/author-detail.component';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { AuthorNewComponent } from './components/author-new/author-new.component';

const routes = [
  {
    path: '',
    component: AuthorListComponent,
  },
  {
    path: 'new',
    component: AuthorNewComponent,
  },
  {
    path: ':id',
    component: AuthorDetailComponent,
    // resolve: {
    //   author: AuthorResolver,
    // },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AuthorRoutingModule {}
