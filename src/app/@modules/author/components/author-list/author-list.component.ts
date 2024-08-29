import { Component, Input, OnInit, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DestroyRef } from '@angular/core';
import { Author } from '../../author.model';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
})
export class AuthorListComponent implements OnInit {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  authors: Author[] = [];
  isOpen = true;

  ngOnInit(): void {
    const url = 'https://biblioteka.simonovicp.com/api/authors';
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer 59|ZUqOsQYkMuPrYvfWtu44fnu3oeWi85f2XN2Coolo`,
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
    const url = `https://biblioteka.simonovicp.com/api/authors/${id}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer 59|ZUqOsQYkMuPrYvfWtu44fnu3oeWi85f2XN2Coolo`,
    );
    this.httpClient.delete<{ data: Author[] }>(url, { headers }).subscribe({
      next: (response) => console.log('Deletion successful', response),
    });
    // unsubscribe
    this.ngOnInit();
  }
}
