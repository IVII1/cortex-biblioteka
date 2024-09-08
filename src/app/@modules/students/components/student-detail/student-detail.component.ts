import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss',
})
export class StudentDetailComponent implements OnInit {
  student!: Student;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.student = this.route.snapshot.data['student'];
  }
}
