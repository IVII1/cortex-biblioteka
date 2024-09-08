/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookResolver implements Resolve<Book> {
  constructor(private bookService: BookService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Book> {
    const bookId = route.paramMap.get('id');
    return this.bookService.get(bookId!);
  }
}
