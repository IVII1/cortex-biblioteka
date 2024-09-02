import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DestroyRef } from '@angular/core';
import { Author } from '../../models/author.model';
import { AuthorService } from '../../services/author.service';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
})
export class AuthorListComponent implements OnInit {
  private router = inject(Router);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  authors: Author[] = [];
  isOpen = true;
  authorService = inject(AuthorService);

  ngOnInit(): void {
    const url = `${environment.apiAuthorsUrl}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${environment.token}`,
    );
    const subscription = this.httpClient
      .get<{ data: Author[] }>(url, { headers })
      .subscribe({
        next: (res) => {
          this.authors = res.data;
          console.log(this.authors);
        },
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  openMenuId: number | null = null;

  toggleMenu(authorId: number) {
    if (this.openMenuId === authorId) {
      this.openMenuId = null;
    } else {
      this.openMenuId = authorId;
    }
  }
  deleteAuthor(id: number) {
    this.authorService.deleteAuthor(id);
    this.ngOnInit();
  }
  saveAuthor(id: number) {
    this.router.navigate(['authors/edit', id]);
    this.authorService.saveAuthor(id);
  }
}
