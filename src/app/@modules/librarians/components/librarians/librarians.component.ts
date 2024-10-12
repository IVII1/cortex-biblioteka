import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  isLoading!: boolean;
  librarians: Librarian[] = [];

  librarianService = inject(LibrarianService);

  ngOnInit(): void {
    this.fetchData();
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
    this.librarianService.delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.fetchData();
        this.router.navigate(['/librarians']);
      },
      error: (err) => console.log(err),
    });
  }
  fetchData() {
    this.isLoading = true;
    this.librarianService.all().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.librarians = res.data;
      },
    });
  }
}
