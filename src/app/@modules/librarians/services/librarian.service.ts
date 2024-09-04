import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Librarian } from '../models/librarian.model';

@Injectable({
  providedIn: 'root',
})
export class LibrarianService {
  httpClient = inject(HttpClient);
  deleteLibrarian(id: number) {
    const url = `${environment.apiUsersUrl}${id}`;
    const headers = new HttpHeaders().set('Authorization', environment.token);
    this.httpClient.delete<{ data: Librarian[] }>(url, { headers }).subscribe({
      next: (response) => console.log('Deletion successful', response),
    });
  }
}
