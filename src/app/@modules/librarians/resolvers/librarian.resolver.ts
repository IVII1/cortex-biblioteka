/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Librarian } from '../models/librarian.model';
import { LibrarianService } from '../services/librarian.service';

@Injectable({
  providedIn: 'root',
})
export class LibrarianResolver implements Resolve<Librarian> {
  constructor(private librarianService: LibrarianService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Librarian> {
    const librarianId = route.paramMap.get('id');
    return this.librarianService.getLibrarian(librarianId!);
  }
}
