/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Author } from '../models/author.model';
import { environment } from 'src/environments/environment.development';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  authors: Author[] = [];
  httpClient = inject(HttpClient);

  delete(id: number) {
    const url = `${environment.apiAuthorsUrl}/${id}`;

    return this.httpClient.delete<{ data: Author[] }>(url);
  }
  save(data: any, id?: number): Observable<Author> {
    if (id) {
      const url = `${environment.apiAuthorsUrl}/${id}`;

      return this.httpClient.put<Author>(url, data);
    } else {
      const url = `${environment.apiStoreAuthors}`;

      return this.httpClient.post<Author>(url, data);
    }
  }

  get(id: string): Observable<Author> {
    return this.httpClient
      .get<{ data: Author }>(`${environment.apiAuthorsUrl}/${id}`)
      .pipe(map((response) => response.data));
  }
  all() {
    const url = `${environment.apiAuthorsUrl}`;

    return this.httpClient.get<{ data: Author[] }>(url);
  }
}
