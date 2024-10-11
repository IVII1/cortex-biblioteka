/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Student } from '../models/student.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  students: Student[] = [];
  httpClient = inject(HttpClient);

  delete(id: number) {
    const url = `${environment.apiUsersUrl}${id}`;

    return this.httpClient.delete<{ data: Student[] }>(url);
  }

  get(id: string): Observable<Student> {
    return this.httpClient
      .get<{
        data: Student;
      }>(`${environment.apiUsersUrl}/${id}`)
      .pipe(map((response) => response.data));
  }
  save(data: any, id?: number): Observable<Student> {
    if (id) {
      const url = `${environment.apiUsersUrl}/${id}`;

      return this.httpClient.put<Student>(url, data);
    } else {
      const url = `${environment.apiUsersStore}`;

      return this.httpClient.post<Student>(url, data);
    }
  }
  all(): Observable<{ data: Student[] }> {
    const url = `${environment.apiUsersUrl}`;

    return this.httpClient.get<{ data: Student[] }>(url);
  }
}
