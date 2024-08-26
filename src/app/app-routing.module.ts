import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './@shared/layouts/app-layout/app-layout.component';
import { AuthorListComponent } from './@modules/author/components/author-list/author-list.component';
import { BookListComponent } from './@modules/book/components/book-list/book-list.component';
import { LibrariansComponent } from './@modules/librarians/components/librarians/librarians.component';
import { StudentsComponent } from './@modules/students/components/students/students.component';
import { AdminComponent } from './@modules/admin/components/admin/admin.component';
import { RecordsComponent } from './@modules/records/components/records/records.component';

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
        path: 'authors',
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
        loadChildren: () =>
          import('./@modules/librarians/librarians.module').then(
            (m) => m.LibrariansModule
          ),
      },
      {
        path: 'students',
        component: StudentsComponent,
        loadChildren: () =>
          import('./@modules/students/students.module').then(
            (m) => m.StudentsModule
          ),
      },

      {
        path: 'records',
        component: RecordsComponent,
        loadChildren: () =>
          import('./@modules/records/records.module').then(
            (m) => m.RecordsModule
          ),
      },
      {
        path: 'admins',
        component: AdminComponent,
        loadChildren: () =>
          import('./@modules/admin/admin.module').then((m) => m.AdminModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
