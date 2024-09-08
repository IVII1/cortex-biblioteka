import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  private router = inject(Router);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  books: Book[] = [];
  isOpen = true;
  bookService = inject(BookService);

  ngOnInit(): void {
    this.bookService.all().subscribe({
      next: (response) => {
        this.books = response.data;
      },
    });
  }
  openMenuId: number | null = null;

  toggleMenu(studentId: number) {
    if (this.openMenuId === studentId) {
      this.openMenuId = null;
    } else {
      this.openMenuId = studentId;
    }
  }
  deleteBook(id: number) {
    this.bookService.delete(id);
    this.bookService.all();
  }
  saveBook(id: number) {
    this.router.navigate(['authors/edit', id]);
    this.bookService.save(id);
  }
}
