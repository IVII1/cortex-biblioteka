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
import { ActivatedRoute, Router } from '@angular/router';
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
  allAuthors: Author[] = [];
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
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.fecthData();
    this.initForm();
  }

  initForm() {
    this.bookForm = this.fb.group({
      nazivKnjiga: [this.book?.title ?? '', Validators.required],
      kratki_sadrzaj: [this.book?.description ?? '', Validators.required],
      categories: [this.book?.categories ?? [], Validators.required],
      genres: [this.book?.genres ?? [], Validators.required],
      authors: [this.book?.authors ?? [], Validators.required],
      izdavac: [this.book?.publishers ?? '', Validators.required],
      godinaIzdavanja: [this.book?.pDate ?? '', Validators.required],
      knjigaKolicina: [
        this.book?.samples ?? '',
        [Validators.required, Validators.min(0)],
      ],
      brStrana: [
        this.book?.pages ?? '',
        [Validators.required, Validators.min(1)],
      ],
      pismo: [this.book?.script ?? '', Validators.required],
      jezik: [this.book?.language ?? '', Validators.required],
      povez: [this.book?.bookbind ?? '', Validators.required],
      format: [this.book?.format ?? '', Validators.required],
      isbn: [this.book?.isbn ?? '', Validators.required],
      deletePdfs: [0, [Validators.required]],
      present: [[1, 2, 3], Validators.required],
      pictures: [
        ['http://library.test/img/profile.jpg', true],
        Validators.required,
      ],
    });
  }

  onSubmit() {

    console.log(this.bookForm.value);
    return;

    if (!this.bookForm.valid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    this.bookService
      .save(this.bookForm.value, this.book?.id)
      .subscribe({ next: (response) => (this.book = response) });
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
  getAllAuthors() {
    this.authorService.allAuthors().subscribe({
      next: (response) => {
        this.allAuthors = response.data;
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
    this.allCategories();
    this.allGenres();
    this.getAllAuthors();
    this.allPublishers();
    this.allScripts();
    this.allFormats();
    this.allBookbinds();
    this.allLanguages();
    this.book = this.route.snapshot.data['book'] || null;
  }
}
