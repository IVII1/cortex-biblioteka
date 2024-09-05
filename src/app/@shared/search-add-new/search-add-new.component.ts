import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorService } from 'src/app/@modules/author/services/author.service';

@Component({
  selector: 'app-search-add-new',
  standalone: true,
  imports: [],
  templateUrl: './search-add-new.component.html',
  styleUrl: './search-add-new.component.scss',
})
export class SearchAddNewComponent {
  router = inject(Router);
  authorService = inject(AuthorService);
  buttonName = input<string>();

  newForm() {
    if (this.buttonName() === 'Add Student') {
      this.router.navigate(['/students/new']);
    }
    if (this.buttonName() === 'Add Author') {
      this.router.navigate(['/authors/new']);
    }
    if (this.buttonName() === 'Add Librarian') {
      this.router.navigate(['/librarians/new']);
    }
  }
}
