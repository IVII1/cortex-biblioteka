/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/@modules/students/models/student.model';
import { StudentService } from 'src/app/@modules/students/services/student.service';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-borrow',
  templateUrl: './book-borrow.component.html',
  styleUrl: './book-borrow.component.scss',
  providers: [DatePipe],
})
export class BookBorrowComponent {
  book!: Book;
  students: Student[] = [];
  borrowForm!: FormGroup;
  borrowEvent!: any;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private bookService: BookService,
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
    this.borrowForm = this.fb.group({
      student_id: ['', [Validators.required]],
      datumIzdavanja: ['', [Validators.required]],
      datumVracanja: ['', [Validators.required]],
    });
    this.borrowForm
      .get('datumIzdavanja')
      ?.valueChanges.subscribe((date) =>
        this.formatDate(date, 'datumIzdavanja'),
      );
    this.borrowForm
      .get('datumVracanja')
      ?.valueChanges.subscribe((date) =>
        this.formatDate(date, 'datumVracanja'),
      );
  }
  onSubmit() {
    this.bookService.borrow(this.book.id, this.borrowForm.value).subscribe({
      next: (response) => (this.borrowEvent = response),
    });
  }

  formatDate(date: Date, controlName: string) {
    if (date) {
      const formattedDate = this.datePipe.transform(date, 'MM/dd/yyyy');
      this.borrowForm
        .get(controlName)
        ?.setValue(formattedDate, { emitEvent: false });
    }
  }
  get student_id(): FormControl {
    return this.borrowForm.get('student_id') as FormControl;
  }
}
