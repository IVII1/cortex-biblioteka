import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './@shared/layouts/app-layout/app-layout.component';
import { AuthorListComponent } from './@modules/author/components/author-list/author-list.component';
import { BookListComponent } from './@modules/book/components/book-list/book-list.component';
import { LibrariansComponent } from './@modules/librarians/components/librarians/librarians.component';
import { StudentsComponent } from './@modules/students/components/students/students.component';
import { IssuedBooksComponent } from './@modules/book/components/issued-books/issued-books.component';
import { AdminComponent } from './@modules/admin/components/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashb',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./@modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'author',
        component: AuthorListComponent,

        loadChildren: () =>
          import('./@modules/author/author.module').then((m) => m.AuthorModule),
      },
      {
        path: 'books',
        component: BookListComponent,

        loadChildren: () =>
          import('./@modules/book/book.module').then((m) => m.BookModule),
      },
      {
        path: 'librarians',
        component: LibrariansComponent,
      },
      {
        path: 'students',
        component: StudentsComponent,
      },
      { path: 'authors', component: AuthorListComponent },
      {
        path: 'record/issued',
        component: IssuedBooksComponent,
      },
      {
        path: 'admins',
        component: AdminComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
