import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DestroyRef } from '@angular/core';
import { Author } from '../../models/author.model';
import { AuthorService } from '../../services/author.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
})
export class AuthorListComponent implements OnInit {
  private router = inject(Router);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  isLoading!: boolean;
  authors: Author[] = [];

  authorService = inject(AuthorService);

  ngOnInit(): void {
    this.fetchData();
  }
  openMenuId: number | null = null;

  toggleMenu(authorId: number) {
    if (this.openMenuId === authorId) {
      this.openMenuId = null;
    } else {
      this.openMenuId = authorId;
    }
  }
  deleteAuthor(id: number) {
    this.authorService.delete(id);
    this.fetchData();
  }
  saveAuthor(id: number) {
    this.router.navigate(['authors/edit', id]);
    this.authorService.save(id);
  }
  fetchData() {
    this.isLoading = true;
    this.authorService.all().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.authors = res.data;
      },
    });
  }
}
