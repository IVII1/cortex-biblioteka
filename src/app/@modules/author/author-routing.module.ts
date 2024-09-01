import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthorDetailComponent } from './components/author-detail/author-detail.component';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { AuthorEditAddComponent } from './components/author-edit-add/author-edit-add.component';

const routes = [
  {
    path: '',
    component: AuthorListComponent,
  },
  {
    path: 'new',
    component: AuthorEditAddComponent,
  },
  {
    path: 'edit/:id',
    component: AuthorEditAddComponent,
    // resolve: {
    //   author: AuthorResolver,
    // },
  },
  {
    path: ':id',
    component: AuthorDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AuthorRoutingModule {}
