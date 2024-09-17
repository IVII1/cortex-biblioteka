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

  delete(id: number) {
    const url = `${environment.apiAuthorsUrl}${id}`;
    const headers = new HttpHeaders().set('Authorization', environment.token);
    this.httpClient.delete<{ data: Author[] }>(url, { headers }).subscribe({});
  }
  save(data: any, id?: number): Observable<Author> {
    if (id) {
      const url = `${environment.apiAuthorsUrl}/${id}`;
      const headers = new HttpHeaders().set('Authorization', environment.token);
      return this.httpClient.put<Author>(url, data, { headers });
    } else {
      const url = `${environment.apiUsersStore}`;
      const headers = new HttpHeaders().set('Authorization', environment.token);
      return this.httpClient.post<Author>(url, data, { headers });
    }
  }

  get(id: string): Observable<Author> {
    const headers = new HttpHeaders().set(`Authorization`, environment.token);

    return this.httpClient
      .get<{ data: Author }>(`${environment.apiAuthorsUrl}/${id}`, { headers })
      .pipe(map((response) => response.data));
  }
  all() {
    const url = `${environment.apiAuthorsUrl}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${environment.token}`,
    );
    return this.httpClient.get<{ data: Author[] }>(url, {
      headers,
    });
  }
}
