import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

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
        this.router.navigate(['/books']);
      },
    });
    this.bookService.all();
  }
}
