import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecordsData } from 'src/app/@modules/records/models/records-data.model';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-return',
  templateUrl: './book-return.component.html',
  styleUrl: './book-return.component.scss',
})
export class BookReturnComponent {
  bookActionsForm!: FormGroup;
  bookReturnForm!: FormGroup;
  logs!: RecordsData[];
  book!: Book;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const bookId = +params['id'];
      this.route.data.subscribe((data) => {
        this.book = data['book'];
      });
      this.bookActionsForm = new FormGroup({
        book_id: new FormControl(bookId, Validators.required),
      });
    });
    this.bookReturned();
    this.initbookReturnForm();
  }

  bookReturned() {
    this.bookService.getReservations(this.bookActionsForm.value).subscribe({
      next: (res) => {
        this.logs = [...res.data.prekoracene, ...res.data.izdate];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  initbookReturnForm() {
    this.bookReturnForm = new FormGroup({
      toReturn: new FormArray([]),
    });
  }

  onCheckboxChange(event: Event, logId: number) {
    const checkbox = event.target as HTMLInputElement;
    const toReturn = this.bookReturnForm.get('toReturn') as FormArray;

    if (checkbox.checked) {
      toReturn.push(new FormControl(logId));
    } else {
      const index = toReturn.controls.findIndex((x) => x.value === logId);
      if (index >= 0) {
        toReturn.removeAt(index);
      }
    }
  }

  isChecked(logId: number): boolean {
    return (this.bookReturnForm.get('toReturn') as FormArray).controls.some(
      (control) => control.value === logId,
    );
  }
  onSubmit() {
    this.bookService.return(this.bookReturnForm.value).subscribe({
      next: () => {
        this.toastr.success('Returned Successfully!');
        this.bookReturned();
      },
      error: () => {
        this.toastr.error('Action Unsuccessful');
      },
    });
  }
}
