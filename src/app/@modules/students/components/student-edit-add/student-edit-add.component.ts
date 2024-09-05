/* eslint-disable no-constant-binary-expression */
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../models/student.model';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-edit-add',
  templateUrl: './student-edit-add.component.html',
  styleUrl: './student-edit-add.component.scss',
})
export class StudentEditAddComponent implements OnInit {
  form!: FormGroup;
  student!: Student;
  studentService = inject(StudentService);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.student = this.route.snapshot.data['student'];
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [this.student.name ?? '', Validators.required],
      surname: [this.student.surname ?? ''],
      role_id: [this.student.role, Validators.required],
      email: [this.student.email, [Validators.required, Validators.email]],
      jmbg: [this.student.jmbg, Validators.required],
      username: [this.student.username, Validators.required],
      password: ['123456', Validators.required],
      password_confirmation: ['123456', Validators.required],
    });
  }

  onSubmit(): void {
    this.studentService.saveStudent(this.form.value, this.student.id);
  }
}
