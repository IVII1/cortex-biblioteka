import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrariansComponent } from './components/librarians/librarians.component';
import { LibrarianDetailComponent } from './components/librarian-detail/librarian-detail.component';
import { LibrarianResolver } from './resolvers/librarian.resolver';

const routes: Routes = [
  { path: '', component: LibrariansComponent },
  {
    path: ':id',
    component: LibrarianDetailComponent,
    resolve: { librarian: LibrarianResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibrariansRoutingModule {}
