/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/@modules/students/services/student.service';
import { Student } from 'src/app/@modules/students/models/student.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BookService } from '../../services/book.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-book-reserve',
  templateUrl: './book-reserve.component.html',
  styleUrl: './book-reserve.component.scss',
  providers: [DatePipe],
})
export class BookReserveComponent implements OnInit {
  book!: Book;
  students: Student[] = [];
  reserveForm!: FormGroup;
  reservation!: any;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private bookService: BookService,
    private router: Router,
    private toastr: ToastrService,
  ) {}
  ngOnInit(): void {
    this.book = this.route.snapshot.data['book'];
    this.fetchStudent();
    this.initForm();
  }
  fetchStudent() {
    this.studentService.all().subscribe({
      next: (response) => (this.students = response.data),
    });
  }
  initForm() {
    this.reserveForm = this.fb.group({
      student_id: ['', [Validators.required]],
      datumRezervisanja: ['', [Validators.required]],
    });
    this.reserveForm
      .get('datumRezervisanja')
      ?.valueChanges.subscribe((date) =>
        this.formatDate(date, 'datumRezervisanja'),
      );
  }
  onSubmit() {
    this.bookService.reserve(this.book.id, this.reserveForm.value).subscribe({
      next: (response) => {
        this.reservation = response;
        this.router.navigate(['/books']);
        this.toastr.success('Rezervacija Uspješna');
      },
      error: () => {
        this.toastr.error('Rezervacija Neuspješna');
      },
    });
  }

  formatDate(date: Date, controlName: string) {
    if (date) {
      const formattedDate = this.datePipe.transform(date, 'MM/dd/yyyy');
      this.reserveForm
        .get(controlName)
        ?.setValue(formattedDate, { emitEvent: false });
    }
  }
  get student_id(): FormControl {
    return this.reserveForm.get('student_id') as FormControl;
  }
  get datumRezervisanja(): FormControl {
    return this.reserveForm.get('datumRezervisanja') as FormControl;
  }
}
