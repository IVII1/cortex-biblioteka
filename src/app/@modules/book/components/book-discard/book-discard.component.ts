import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { RecordsData } from 'src/app/@modules/records/models/records-data.model';
import { Book } from '../../models/book.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-discard',
  templateUrl: './book-discard.component.html',
  styleUrls: ['./book-discard.component.scss'],
})
export class BookDiscardComponent implements OnInit {
  bookActionsForm!: FormGroup;
  bookDiscardForm!: FormGroup;
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
    this.bookDiscarded();
    this.initBookDiscardForm();
  }

  bookDiscarded() {
    this.bookService.getReservations(this.bookActionsForm.value).subscribe({
      next: (res) => {
        this.logs = [...res.data.prekoracene];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  initBookDiscardForm() {
    this.bookDiscardForm = new FormGroup({
      toWriteoff: new FormArray([]),
    });
  }

  onCheckboxChange(event: Event, logId: number) {
    const checkbox = event.target as HTMLInputElement;
    const toWriteOff = this.bookDiscardForm.get('toWriteoff') as FormArray;

    if (checkbox.checked) {
      toWriteOff.push(new FormControl(logId));
    } else {
      const index = toWriteOff.controls.findIndex((x) => x.value === logId);
      if (index >= 0) {
        toWriteOff.removeAt(index);
      }
    }
  }

  isChecked(logId: number): boolean {
    return (this.bookDiscardForm.get('toWriteoff') as FormArray).controls.some(
      (control) => control.value === logId,
    );
  }
  onSubmit() {
    console.log(this.bookDiscardForm.value);
    this.bookService.writeOff(this.bookDiscardForm.value).subscribe({
      next: () => {
        this.toastr.success('Returned Successfully!');
        this.bookDiscarded();
      },
      error: () => {
        this.toastr.error('Action Unsuccessful');
      },
    });
  }
}
