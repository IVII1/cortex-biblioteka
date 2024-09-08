import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Student } from '../../models/student.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  private router = inject(Router);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  students: Student[] = [];
  isOpen = true;
  studentService = inject(StudentService);

  ngOnInit(): void {
    const url = `${environment.apiUsersUrl}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${environment.token}`,
    );
    const subscription = this.httpClient
      .get<{ data: Student[] }>(url, { headers })
      .subscribe({
        next: (res) => {
          this.students = res.data;
        },
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  openMenuId: number | null = null;

  toggleMenu(studentId: number) {
    if (this.openMenuId === studentId) {
      this.openMenuId = null;
    } else {
      this.openMenuId = studentId;
    }
  }
  deleteStudent(id: number) {
    this.studentService.deleteStudent(id);
    this.ngOnInit();
  }
}
