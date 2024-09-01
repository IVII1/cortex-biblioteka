import { Component, inject } from '@angular/core';
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

  newAuthor() {
    this.router.navigate(['/authors/new']);
    this.authorService.saveAuthor();
  }
}
