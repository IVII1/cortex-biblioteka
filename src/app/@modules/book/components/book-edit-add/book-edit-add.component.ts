// book-edit-add.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../models/book.model';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { AuthorService } from 'src/app/@modules/author/services/author.service';
import { Genre } from '../../models/genre';
import { Category } from '../../models/category';
import { Author } from '../../models/author';
import { Publisher } from '../../models/publisher';
import { Script } from '../../models/script';
import { Format } from '../../models/format';
import { Bookbind } from '../../models/bookbind';
import { Router } from '@angular/router';
import { Language } from '../../models/language';

@Component({
  selector: 'app-book-edit-add',
  templateUrl: './book-edit-add.component.html',
  styleUrls: ['./book-edit-add.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTabsModule,
  ],
})
export class BookEditAddComponent implements OnInit {
  bookForm!: FormGroup;
  book!: Book | null;
  genres: Genre[] = [];
  categories: Category[] = [];
  authors: Author[] = [];
  publishers: Publisher[] = [];
  scripts: Script[] = [];
  formats: Format[] = [];
  bookbinds: Bookbind[] = [];
  languages: Language[] = [];

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.fecthData();
    this.initForm();
  }

  initForm() {
    this.bookForm = this.fb.group({
      nazivKnjiga: ['', Validators.required],
      kratki_sadrzaj: [''],
      categories: [[], Validators.required],
      genres: [[], Validators.required],
      authors: [[], Validators.required],
      izdavac: ['', Validators.required],
      godinaIzdavanja: ['', Validators.required],
      knjigaKolicina: ['', [Validators.required, Validators.min(0)]],
      brStrana: [1, [Validators.required, Validators.min(1)]],
      pismo: ['', Validators.required],
      jezik: ['', Validators.required],
      povez: ['', Validators.required],
      format: ['', Validators.required],
      isbn: ['', [Validators.required]],
      deletePdfs: [0, [Validators.required]],
      present: [[1, 2, 3], Validators.required],
      pictures: [
        ['http://library.test/img/profile.jpg', true],
        Validators.required,
      ],
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      console.log('Form submitted', this.bookForm.value);
      this.bookService.save(this.bookForm.value, this.book?.id);
      this.bookService.save(this.bookForm.value, this.book?.id).subscribe(
        (response) => {
          console.log('Book saved successfully:', response);
          this.router.navigate(['/books']);
        },
        (error) => {
          console.error('Error saving book:', error);
        },
      );
    } else {
      console.log('Form is invalid');

      Object.keys(this.bookForm.controls).forEach((key) => {
        const control = this.bookForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  yearRange(count: number): number[] {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: count }, (_, i) => currentYear - i);
  }
  allCategories() {
    this.bookService.allCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: (err) => console.error(err),
    });
  }
  allGenres() {
    this.bookService.allGenres().subscribe({
      next: (response) => {
        this.genres = response.data;
      },
      error: (err) => console.error(err),
    });
  }
  allAuthors() {
    this.authorService.allAuthors().subscribe({
      next: (response) => {
        this.authors = response.data;
      },
      error: (err) => console.error(err),
    });
  }
  allPublishers() {
    this.bookService.allPublishers().subscribe({
      next: (response) => {
        this.publishers = response.data;
      },
      error: (err) => console.error(err),
    });
  }
  allScripts() {
    this.bookService.allScripts().subscribe({
      next: (response) => {
        this.scripts = response.data;
      },
      error: (err) => console.error(err),
    });
  }
  allFormats() {
    this.bookService.allFormats().subscribe({
      next: (response) => {
        this.formats = response.data;
      },
      error: (err) => console.error(err),
    });
  }
  allBookbinds() {
    this.bookService.allBookbinds().subscribe({
      next: (response) => {
        this.bookbinds = response.data;
      },
      error: (err) => console.error(err),
    });
  }
  allLanguages() {
    this.bookService.allLanguages().subscribe({
      next: (response) => {
        this.languages = response.data;
      },
      error: (err) => console.error(err),
    });
  }

  fecthData() {
    this.initForm();
    this.allCategories();
    this.allGenres();
    this.allAuthors();
    this.allPublishers();
    this.allScripts();
    this.allFormats();
    this.allBookbinds();
    this.allLanguages();
  }
}
