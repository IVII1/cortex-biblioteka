import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  private router = inject(Router);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  isLoading!: boolean;
  books: Book[] = [];

  bookService = inject(BookService);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    this.fetchData();
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
  saveBook(id: number) {
    this.router.navigate(['authors/edit', id]);
    this.bookService.save(id);
  }
  fetchData() {
    this.isLoading = true;
    this.bookService.all().subscribe({
      next: (response) => {
        this.books = response.data;
        this.isLoading = false;
      },
    });
  }
}
