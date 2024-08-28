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

  ngOnInit(): void {
    const url = 'https://biblioteka.simonovicp.com/api/authors';
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer 59|ZUqOsQYkMuPrYvfWtu44fnu3oeWi85f2XN2Coolo`
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
}
