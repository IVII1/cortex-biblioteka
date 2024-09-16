import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  book!: Book;

  constructor(private route: ActivatedRoute) {}

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
}
