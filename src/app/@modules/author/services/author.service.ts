/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { Author } from '../models/author.model';
import { environment } from 'src/environments/environment.development';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  authors: Author[] = [];
  httpClient = inject(HttpClient);
  destroyRef = inject(DestroyRef);
  router = inject(Router);

  deleteAuthor(id: number) {
    const url = `${environment.apiAuthorsUrl}${id}`;
    const headers = new HttpHeaders().set('Authorization', environment.token);
    this.httpClient.delete<{ data: Author[] }>(url, { headers }).subscribe({
      next: (response) => console.log('Deletion successful', response),
    });
  }
  saveAuthor(data: any, id?: number) {
    if (id) {
      const url = `${environment.apiAuthorsUrl}/${id}`;
      const headers = new HttpHeaders().set('Authorization', environment.token);
      this.httpClient.put<Author>(url, data, { headers }).subscribe({
        next: (response) => console.log(response),
      });
    } else {
      const url = `${environment.apiUsersStore}`;
      const headers = new HttpHeaders().set('Authorization', environment.token);
      this.httpClient.post<Author>(url, data, { headers }).subscribe({
        next: (response) => console.log(response),
      });
    }
    this.router.navigate(['/authors']);
  }

  getAuthor(id: string): Observable<Author> {
    const headers = new HttpHeaders().set(`Authorization`, environment.token);

    return this.httpClient
      .get<{ data: Author }>(`${environment.apiAuthorsUrl}/${id}`, { headers })
      .pipe(map((response) => response.data));
  }
}
