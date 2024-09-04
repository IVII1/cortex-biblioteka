/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorService } from '../services/author.service';
import { Author } from '../models/author.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorResolver implements Resolve<Author> {
  constructor(private authorService: AuthorService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Author> {
    const authorId = route.paramMap.get('id');
    return this.authorService.getAuthor(authorId!);
  }
}
