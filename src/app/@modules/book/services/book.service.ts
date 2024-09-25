/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  httpClient = inject(HttpClient);
  router = inject(Router);
  delete(id: number): Observable<{ data: Book }> {
    const url = `${environment.apiBooks}/${id}/destroy`;
    const headers = new HttpHeaders().set('Authorization', environment.token);
    return this.httpClient.delete<{ data: Book }>(url, { headers });
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
      const url = `${environment.apiBookUpdate}/${id}/update`;
      const headers = new HttpHeaders().set('Authorization', environment.token);
      return this.httpClient.post<Book>(url, data, { headers });
    } else {
      const url = `${environment.apiBookStore}`;
      const headers = new HttpHeaders().set('Authorization', environment.token);
      return this.httpClient.post<Book>(url, data, { headers });
    }
  }

  all(): Observable<any> {
    const url = `${environment.apiBooks}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${environment.token}`,
    );
    return this.httpClient.get(url, { headers });
  }
  allGenres(): Observable<any> {
    const url = `${environment.apiGenres}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${environment.token}`,
    );
    return this.httpClient.get(url, { headers });
  }
  allCategories(): Observable<any> {
    const url = `${environment.apiCategories}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${environment.token}`,
    );
    return this.httpClient.get(url, { headers });
  }
  allPublishers(): Observable<any> {
    const url = `${environment.apiPublishers}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${environment.token}`,
    );
    return this.httpClient.get(url, { headers });
  }
  allScripts(): Observable<any> {
    const url = `${environment.apiScripts}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${environment.token}`,
    );
    return this.httpClient.get(url, { headers });
  }
  allBookbinds(): Observable<any> {
    const url = `${environment.apiBookbinds}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${environment.token}`,
    );
    return this.httpClient.get(url, { headers });
  }
  allFormats(): Observable<any> {
    const url = `${environment.apiFormats}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${environment.token}`,
    );
    return this.httpClient.get(url, { headers });
  }
  allLanguages(): Observable<any> {
    const url = `${environment.apiLanguages}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${environment.token}`,
    );
    return this.httpClient.get(url, { headers });
  }

  reserve(id: number, data: any): Observable<any> {
    const url = `${environment.apiBooks}/${id}/reserve`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${environment.token}`,
    );
    return this.httpClient.post(url, data, { headers });
  }
  borrow(id: number, data: any): Observable<any> {
    const url = `${environment.apiBooks}/${id}/izdaj`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${environment.token}`,
    );
    return this.httpClient.post(url, data, { headers });
  }
  getReservations(data: any): Observable<any> {
    const url = `${environment.apiRecordsBorrow}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${environment.token}`,
    );
    const options = {
      headers: headers,
      params: data,
    };
    return this.httpClient.get(url, options);
  }
  writeOff(data: any): Observable<any> {
    const url = `${environment.apiBooksWriteOff}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${environment.token}`,
    );
    return this.httpClient.post(url, data, { headers });
  }
  return(data: any) {
    const url = `${environment.apiBooksReturn}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${environment.token}`,
    );
    return this.httpClient.post(url, data, { headers });
  }
  getSingleBookData(data: any): Observable<any> {
    const borrowUrl = environment.apiRecordsBorrow;
    const reserveUrl = environment.apiBooksReserve;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${environment.token}`,
    );
    const options = {
      headers: headers,
      params: data,
    };
    return forkJoin({
      borrows: this.httpClient.get(borrowUrl, options),
      reservations: this.httpClient.get(reserveUrl, options),
    });
  }
}
