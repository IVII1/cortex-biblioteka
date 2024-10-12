import { Component, OnInit } from '@angular/core';
import { Author } from '../../models/author.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss'],
})
export class AuthorDetailComponent implements OnInit {
  author!: Author;
  authors!: Author[];
  isLoading!: boolean;
  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.author = this.route.snapshot.data['author'];
  }
  openMenuId: number | null = null;

  toggleMenu(authorId: number) {
    if (this.openMenuId === authorId) {
      this.openMenuId = null;
    } else {
      this.openMenuId = authorId;
    }
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
  deleteAuthor(id: number) {
    this.authorService.delete(id).subscribe({
      next: () => {
        this.fetchData();
        this.router.navigate(['/authors']);
      },
    });
  }
}
