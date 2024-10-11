/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  httpClient = inject(HttpClient);

  delete(id: number): Observable<{ data: Book }> {
    const url = `${environment.apiBooks}/${id}/destroy`;

    return this.httpClient.delete<{ data: Book }>(url);
  }
  get(id: string): Observable<Book> {
    return this.httpClient
      .get<{
        data: Book;
      }>(`${environment.apiBooks}/${id}`)
      .pipe(map((response) => response.data));
  }
  save(data: any, id?: number) {
    if (id) {
      const url = `${environment.apiBookUpdate}/${id}/update`;

      return this.httpClient.post<Book>(url, data);
    } else {
      const url = `${environment.apiBookStore}`;

      return this.httpClient.post<Book>(url, data);
    }
  }

  all(): Observable<any> {
    const url = `${environment.apiBooks}`;

    return this.httpClient.get(url);
  }
  allGenres(): Observable<any> {
    const url = `${environment.apiGenres}`;

    return this.httpClient.get(url);
  }
  allCategories(): Observable<any> {
    const url = `${environment.apiCategories}`;

    return this.httpClient.get(url);
  }
  allPublishers(): Observable<any> {
    const url = `${environment.apiPublishers}`;

    return this.httpClient.get(url);
  }
  allScripts(): Observable<any> {
    const url = `${environment.apiScripts}`;

    return this.httpClient.get(url);
  }
  allBookbinds(): Observable<any> {
    const url = `${environment.apiBookbinds}`;

    return this.httpClient.get(url);
  }
  allFormats(): Observable<any> {
    const url = `${environment.apiFormats}`;

    return this.httpClient.get(url);
  }
  allLanguages(): Observable<any> {
    const url = `${environment.apiLanguages}`;

    return this.httpClient.get(url);
  }

  reserve(id: number, data: any): Observable<any> {
    const url = `${environment.apiBooks}/${id}/reserve`;

    return this.httpClient.post(url, data);
  }
  borrow(id: number, data: any): Observable<any> {
    const url = `${environment.apiBooks}/${id}/izdaj`;

    return this.httpClient.post(url, data);
  }
  getReservations(data: any): Observable<any> {
    const url = `${environment.apiRecordsBorrow}`;

    const options = {
      params: data,
    };
    return this.httpClient.get(url, options);
  }
  writeOff(data: any): Observable<any> {
    const url = `${environment.apiBooksWriteOff}`;

    return this.httpClient.post(url, data);
  }
  return(data: any) {
    const url = `${environment.apiBooksReturn}`;

    return this.httpClient.post(url, data);
  }
  getSingleBookData(data: any): Observable<any> {
    const borrowUrl = environment.apiRecordsBorrow;
    const reserveUrl = environment.apiBooksReserve;

    const options = {
      params: data,
    };
    return forkJoin({
      borrows: this.httpClient.get(borrowUrl, options),
      reservations: this.httpClient.get(reserveUrl, options),
    });
  }
}
