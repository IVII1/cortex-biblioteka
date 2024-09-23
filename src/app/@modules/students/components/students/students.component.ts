import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Student } from '../../models/student.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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

  isLoading!: boolean;
  studentService = inject(StudentService);

  ngOnInit(): void {
    this.fetchData();
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
    this.studentService.delete(id);
    this.fetchData();
  }
  fetchData() {
    this.isLoading = true;
    this.studentService.all().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.students = res.data;
      },
    });
  }
}
