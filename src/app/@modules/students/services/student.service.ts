/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Student } from '../models/student.model';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  students: Student[] = [];
  destroyRef = inject(DestroyRef);
  httpClient = inject(HttpClient);
  router = inject(Router);
  delete(id: number) {
    const url = `${environment.apiUsersUrl}${id}`;
    const headers = new HttpHeaders().set('Authorization', environment.token);
    this.httpClient.delete<{ data: Student[] }>(url, { headers }).subscribe({});
  }

  get(id: string): Observable<Student> {
    const headers = new HttpHeaders().set(`Authorization`, environment.token);

    return this.httpClient
      .get<{
        data: Student;
      }>(`${environment.apiUsersUrl}/${id}`, { headers })
      .pipe(map((response) => response.data));
  }
  save(data: any, id?: number) {
    if (id) {
      const url = `${environment.apiUsersUrl}/${id}`;
      const headers = new HttpHeaders().set('Authorization', environment.token);
      this.httpClient.put<Student>(url, data, { headers }).subscribe({});
    } else {
      const url = `${environment.apiUsersStore}`;
      const headers = new HttpHeaders().set('Authorization', environment.token);
      this.httpClient.post<Student>(url, data, { headers }).subscribe({});
    }
    this.router.navigate(['/students']);
  }
  all(): Observable<{ data: Student[] }> {
    const url = `${environment.apiUsersUrl}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${environment.token}`,
    );
    return this.httpClient.get<{ data: Student[] }>(url, { headers });
  }
}
