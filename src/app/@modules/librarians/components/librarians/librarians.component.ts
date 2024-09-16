import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { Librarian } from '../../models/librarian.model';
import { LibrarianService } from '../../services/librarian.service';

@Component({
  selector: 'app-librarians',
  templateUrl: './librarians.component.html',
  styleUrls: ['./librarians.component.scss'],
})
export class LibrariansComponent implements OnInit {
  private router = inject(Router);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  librarians: Librarian[] = [];
  isOpen = true;
  librarianService = inject(LibrarianService);

  ngOnInit(): void {
    const url = `${environment.apiUsersUrl}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${environment.token}`,
    );
    const subscription = this.httpClient
      .get<{ data: Librarian[] }>(url, { headers })
      .subscribe({
        next: (res) => {
          this.librarians = res.data;
        },
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  openMenuId: number | null = null;

  toggleMenu(librarianId: number) {
    if (this.openMenuId === librarianId) {
      this.openMenuId = null;
    } else {
      this.openMenuId = librarianId;
    }
  }
  deleteLibrarian(id: number) {
    this.librarianService.deleteLibrarian(id);
    this.ngOnInit();
  }
}
