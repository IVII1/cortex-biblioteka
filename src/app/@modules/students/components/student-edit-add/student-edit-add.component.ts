// eslint-disable no-constant-binary-expression
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Student } from '../../models/student.model';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-edit-add',
  templateUrl: './student-edit-add.component.html',
  styleUrl: './student-edit-add.component.scss',
})
export class StudentEditAddComponent implements OnInit {
  student!: Student | null;
  form!: FormGroup;
  studentService = inject(StudentService);
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.student = this.route.snapshot.data['student'] || null;
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [this.student?.name ?? '', Validators.required],
      surname: [this.student?.surname ?? ''],
      role_id: [this.student?.role ?? '', Validators.required],
      email: [
        this.student?.email ?? '',
        [Validators.required, Validators.email],
      ],
      jmbg: [this.student?.jmbg ?? '', Validators.required],
      username: [this.student?.username ?? '', Validators.required],
      password: ['12345678', Validators.required],
      password_confirmation: ['12345678', Validators.required],
      photoPath: ['http://library.test/img/profile.jpg', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.studentService.save(this.form.value, this.student?.id).subscribe({
        next: () => {
          this.router.navigate(['/students']);
        },
        error: () => {},
      });
    } else {
      this.errorMessage = 'Form is invalid, please fill out all the fields.';
    }
  }
  onCancel() {
    this.router.navigate(['/students']);
  }
  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }
  get surname(): FormControl {
    return this.form.get('surname') as FormControl;
  }
  get role_id(): FormControl {
    return this.form.get('role_id') as FormControl;
  }
  get jmbg(): FormControl {
    return this.form.get('jmbg') as FormControl;
  }
  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }
  get username(): FormControl {
    return this.form.get('username') as FormControl;
  }
  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }
  get password_confirmation(): FormControl {
    return this.form.get('password_confirmation') as FormControl;
  }
}
