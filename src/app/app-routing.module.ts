import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './@modules/auth/layout/layout.component';
import { AppLayoutComponent } from './@shared/layouts/app-layout/app-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AppLayoutComponent,

    children: [
      {
        path: 'authors',

        loadChildren: () =>
          import('./@modules/author/author.module').then((m) => m.AuthorModule),
      },
      {
        path: 'books',

        loadChildren: () =>
          import('./@modules/book/book.module').then((m) => m.BookModule),
      },
      {
        path: 'librarians',

        loadChildren: () =>
          import('./@modules/librarians/librarians.module').then(
            (m) => m.LibrariansModule,
          ),
      },
      {
        path: 'students',

        loadChildren: () =>
          import('./@modules/students/students.module').then(
            (m) => m.StudentsModule,
          ),
      },

      {
        path: 'records',

        loadChildren: () =>
          import('./@modules/records/records.module').then(
            (m) => m.RecordsModule,
          ),
      },
    ],
  },
  {
    path: 'auth',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./@modules/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
