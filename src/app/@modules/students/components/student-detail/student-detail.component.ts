import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student.model';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss',
})
export class StudentDetailComponent implements OnInit {
  student!: Student;
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.student = this.route.snapshot.data['student'];
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
    this.studentService.delete(id).subscribe({
      next: () => this.router.navigate(['/students']),
    });
  }
}
