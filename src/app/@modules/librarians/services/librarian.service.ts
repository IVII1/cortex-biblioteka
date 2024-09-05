/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Librarian } from '../models/librarian.model';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LibrarianService {
  httpClient = inject(HttpClient);
  router = inject(Router);
  deleteLibrarian(id: number) {
    const url = `${environment.apiUsersUrl}${id}`;
    const headers = new HttpHeaders().set('Authorization', environment.token);
    this.httpClient.delete<{ data: Librarian[] }>(url, { headers }).subscribe({
      next: (response) => console.log('Deletion successful', response),
    });
  }
  getLibrarian(id: string): Observable<Librarian> {
    const headers = new HttpHeaders().set(`Authorization`, environment.token);

    return this.httpClient
      .get<{
        data: Librarian;
      }>(`${environment.apiUsersUrl}/${id}`, { headers })
      .pipe(map((response) => response.data));
  }
  saveLibrarian(data: any, id?: number) {
    if (id) {
      const url = `${environment.apiUsersUrl}/${id}`;
      const headers = new HttpHeaders().set('Authorization', environment.token);
      this.httpClient.put<Librarian>(url, data, { headers }).subscribe({
        next: (response) => console.log(response),
      });
    } else {
      const url = `${environment.apiUsersStore}`;
      const headers = new HttpHeaders().set('Authorization', environment.token);
      this.httpClient.post<Librarian>(url, data, { headers }).subscribe({
        next: (response) => console.log(response),
      });
    }
    this.router.navigate(['/librarians']);
  }
}
