import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrariansRoutingModule } from './librarians-routing.module';
import { LibrarianDetailComponent } from './components/librarian-detail/librarian-detail.component';
import { LibrarianEditAddComponent } from './components/librarian-edit-add/librarian-edit-add.component';

@NgModule({
  declarations: [
    LibrarianDetailComponent,
    LibrarianEditAddComponent
  ],
  imports: [CommonModule, LibrariansRoutingModule],
})
export class LibrariansModule {}
