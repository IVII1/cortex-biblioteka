/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  httpClient = inject(HttpClient);
  router = inject(Router);
  delete(id: number) {
    const url = `${environment.apiBooks}/${id}/destroy`;
    const headers = new HttpHeaders().set('Authorization', environment.token);
    this.httpClient.delete<{ data: Book[] }>(url, { headers }).subscribe({});
  }
  get(id: string): Observable<Book> {
    const headers = new HttpHeaders().set(`Authorization`, environment.token);

    return this.httpClient
      .get<{
        data: Book;
      }>(`${environment.apiBooks}/${id}`, { headers })
      .pipe(map((response) => response.data));
  }
  save(data: any, id?: number) {
    if (id) {
      const url = `${environment.apiBooks}/${id}`;
      const headers = new HttpHeaders().set('Authorization', environment.token);
      this.httpClient.put<Book>(url, data, { headers });
    } else {
      const url = `${environment.apiBooks}`;
      const headers = new HttpHeaders().set('Authorization', environment.token);
      this.httpClient.post<Book>(url, data, { headers });
    }
    this.router.navigate(['/books']);
  }

  all(): Observable<any> {
    const url = `${environment.apiBooks}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${environment.token}`,
    );
    return this.httpClient.get(url, { headers });
  }
}
