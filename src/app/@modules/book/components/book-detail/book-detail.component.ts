import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ToastrService } from 'ngx-toastr';
import { RecordsData } from 'src/app/@modules/records/models/records-data.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  book!: Book;
  borrows!: RecordsData[];
  reservations!: RecordsData[];
  overdrafts!: RecordsData[];
  returns!: RecordsData[];
  activeReservations!: RecordsData[];
  archivedReservations!: RecordsData[];
  isLoading!: boolean;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.book = data['book'];
    });
    this.getRecordsData();
  }
  openMenuId: number | null = null;

  toggleMenu(bookId: number) {
    if (this.openMenuId === bookId) {
      this.openMenuId = null;
    } else {
      this.openMenuId = bookId;
    }
  }
  deleteBook(id: number) {
    this.bookService.delete(id).subscribe({
      next: () => {
        this.bookService.all();
        this.toastr.success('Book Deleted Successfully');
        this.router.navigate(['/books']);
      },
      error: () => {
        this.toastr.error('Error Deleting Book');
      },
    });
  }
  getRecordsData() {
    this.isLoading = true;
    this.bookService
      .getSingleBookData({
        book_id: this.book.id,
      })
      .subscribe({
        next: (res) => {
          this.borrows = res.borrows.data.izdate;
          this.overdrafts = res.borrows.data.prekoracene;
          this.returns = res.borrows.data.vracene;
          this.activeReservations = res.reservations.data.active;
          this.archivedReservations = res.reservations.data.archive;
          this.isLoading = false;
        },
      });
  }
  writeOff(id: number) {
    this.bookService.writeOff({ toWriteoff: id }).subscribe({
      next: () => {
        this.getRecordsData();
        this.router.navigate(['/records/borrowed']);
      },
    });
  }
  return(id: number) {
    this.bookService.return({ toReturn: id }).subscribe({
      next: () => {
        this.getRecordsData();
        this.router.navigate(['/records/borrowed']);
      },
    });
  }
}
