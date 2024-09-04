import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Student } from '../models/student.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  httpClient = inject(HttpClient);
  deleteStudent(id: number) {
    const url = `${environment.apiUsersUrl}${id}`;
    const headers = new HttpHeaders().set('Authorization', environment.token);
    this.httpClient.delete<{ data: Student[] }>(url, { headers }).subscribe({
      next: (response) => console.log('Deletion successful', response),
    });
  }
  getStudent(id: string): Observable<Student> {
    const headers = new HttpHeaders().set(`Authorization`, environment.token);

    return this.httpClient
      .get<{
        data: Student;
      }>(`${environment.apiUsersUrl}/${id}`, { headers })
      .pipe(map((response) => response.data));
  }
}
