import { Component, OnInit } from '@angular/core';
import { Librarian } from '../../models/librarian.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LibrarianService } from '../../services/librarian.service';

@Component({
  selector: 'app-librarian-detail',
  templateUrl: './librarian-detail.component.html',
  styleUrl: './librarian-detail.component.scss',
})
export class LibrarianDetailComponent implements OnInit {
  librarian!: Librarian;
  librarians!: Librarian[];
  isLoading!: boolean;
  constructor(
    private route: ActivatedRoute,
    private librarianService: LibrarianService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.librarian = this.route.snapshot.data['librarian'];
  }

  openMenuId: number | null = null;

  toggleMenu(authorId: number) {
    if (this.openMenuId === authorId) {
      this.openMenuId = null;
    } else {
      this.openMenuId = authorId;
    }
  }

  deleteLibrarian(id: number) {
    this.librarianService.delete(id).subscribe({
      next: () => this.router.navigate(['/librarians']),
      error: (err) => console.log(err),
    });
  }
}
