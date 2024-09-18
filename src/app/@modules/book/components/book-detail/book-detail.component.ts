import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  book!: Book;

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
      error: (err) => {
        this.toastr.error('Error Deleting Book');
        console.log(err);
      },
    });
  }
}
