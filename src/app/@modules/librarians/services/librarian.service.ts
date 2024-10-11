/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Librarian } from '../models/librarian.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibrarianService {
  httpClient = inject(HttpClient);

  delete(id: number) {
    const url = `${environment.apiUsersUrl}${id}`;

    this.httpClient.delete<{ data: Librarian[] }>(url).subscribe({});
  }
  get(id: string): Observable<Librarian> {
    return this.httpClient
      .get<{
        data: Librarian;
      }>(`${environment.apiUsersUrl}/${id}`)
      .pipe(map((response) => response.data));
  }
  save(data: any, id?: number): Observable<Librarian> {
    if (id) {
      const url = `${environment.apiUsersUrl}/${id}`;
      return this.httpClient.put<Librarian>(url, data);
    } else {
      const url = `${environment.apiUsersStore}`;
      return this.httpClient.post<Librarian>(url, data, {});
    }
  }
  all() {
    const url = `${environment.apiUsersUrl}`;

    return this.httpClient.get<{ data: Librarian[] }>(url);
  }
}
