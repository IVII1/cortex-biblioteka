/* eslint-disable no-constant-binary-expression */
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  allGenres: Genre[] = [];
  allCategories: Category[] = [];
  allAuthors: (Author & { id: number })[] = [];
  allPublishers: Publisher[] = [];
  allScripts: Script[] = [];
  allFormats: Format[] = [];
  allBookbinds: Bookbind[] = [];
  allLanguages: Language[] = [];
  errorMessage: string = '';

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
      categories: [
        this.book?.categories.map((item) => item.id) ?? [],
        Validators.required,
      ],
      genres: [
        this.book?.genres.map((item) => item.id) ?? [],
        Validators.required,
      ],
      authors: [
        this.book?.authors.map((item) => item.id) ?? [],
        Validators.required,
      ],
      izdavac: [this.book?.publisher.id ?? '', Validators.required],
      godinaIzdavanja: [this.book?.pDate ?? '', Validators.required],
      knjigaKolicina: [
        this.book?.samples ?? '',
        [Validators.required, Validators.min(0)],
      ],
      brStrana: [
        this.book?.pages ?? '',
        [Validators.required, Validators.min(1)],
      ],
      pismo: [this.book?.script.id ?? '', Validators.required],
      jezik: [this.book?.language.id ?? '', Validators.required],
      povez: [this.book?.bookbind.id ?? '', Validators.required],
      format: [this.book?.format.id ?? '', Validators.required],
      isbn: [
        this.book?.isbn ? Number(this.book?.isbn) : '',
        Validators.required,
      ],
      deletePdfs: [0, [Validators.required]],
      present: [[1, 2, 3], Validators.required],
      pictures: [
        ['http://library.test/img/profile.jpg', true],
        Validators.required,
      ],
    });
  }

  onSubmit() {
    if (!this.bookForm.valid) {
      this.bookForm.markAllAsTouched();
      this.errorMessage = 'Form is invalid, try again.';
    }

    this.bookService.save(this.bookForm.value, this.book?.id).subscribe({
      next: () => {
        this.router.navigate(['books']);
      },
      error: () => {},
    });
  }

  yearRange(count: number): number[] {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: count }, (_, i) => currentYear - i);
  }
  getAllCategories() {
    this.bookService.allCategories().subscribe({
      next: (response) => {
        this.allCategories = response.data;
      },
      error: (err) => console.error(err),
    });
  }
  getAllGenres() {
    this.bookService.allGenres().subscribe({
      next: (response) => {
        this.allGenres = response.data;
      },
      error: (err) => console.error(err),
    });
  }
  getAllAuthors() {
    this.authorService.all().subscribe({
      next: (response) => {
        this.allAuthors = response.data.filter(
          (author): author is Author & { id: number } =>
            typeof author.id === 'number',
        );
      },
      error: (err) => console.error(err),
    });
  }
  isCreatedAuthor(author: Author): author is Author & { id: number } {
    return typeof author.id === 'number';
  }

  getAllPublishers() {
    this.bookService.allPublishers().subscribe({
      next: (response) => {
        this.allPublishers = response.data;
      },
      error: (err) => console.error(err),
    });
  }
  getAllScripts() {
    this.bookService.allScripts().subscribe({
      next: (response) => {
        this.allScripts = response.data;
      },
      error: (err) => console.error(err),
    });
  }
  getAllFormats() {
    this.bookService.allFormats().subscribe({
      next: (response) => {
        this.allFormats = response.data;
      },
      error: (err) => console.error(err),
    });
  }
  getAllBookbinds() {
    this.bookService.allBookbinds().subscribe({
      next: (response) => {
        this.allBookbinds = response.data;
      },
      error: (err) => console.error(err),
    });
  }
  getAllLanguages() {
    this.bookService.allLanguages().subscribe({
      next: (response) => {
        this.allLanguages = response.data;
      },
      error: (err) => console.error(err),
    });
  }

  fecthData() {
    this.getAllCategories();
    this.getAllGenres();
    this.getAllAuthors();
    this.getAllPublishers();
    this.getAllScripts();
    this.getAllFormats();
    this.getAllBookbinds();
    this.getAllLanguages();
    this.book = this.route.snapshot.data['book'] || null;
  }
  openMenuId: number | null = null;

  toggleMenu(studentId: number) {
    if (this.openMenuId === studentId) {
      this.openMenuId = null;
    } else {
      this.openMenuId = studentId;
    }
  }
  onCancel() {
    this.router.navigate(['/books']);
  }

  get nazivKnjiga(): FormControl {
    return this.bookForm.get('nazivKnjiga') as FormControl;
  }
  get categories(): FormControl {
    return this.bookForm.get('categories') as FormControl;
  }
  get authors(): FormControl {
    return this.bookForm.get('authors') as FormControl;
  }
  get izdavac(): FormControl {
    return this.bookForm.get('izdavac') as FormControl;
  }
  get jezik(): FormControl {
    return this.bookForm.get('jezik') as FormControl;
  }
  get knjigaKolicina(): FormControl {
    return this.bookForm.get('knjigaKolicina') as FormControl;
  }
  get pismo(): FormControl {
    return this.bookForm.get('pismo') as FormControl;
  }
  get povez(): FormControl {
    return this.bookForm.get('povez') as FormControl;
  }
  get format(): FormControl {
    return this.bookForm.get('format') as FormControl;
  }
  get isbn(): FormControl {
    return this.bookForm.get('isbn') as FormControl;
  }
  get brStrana(): FormControl {
    return this.bookForm.get('brStrana') as FormControl;
  }
  get kratki_sadrzaj(): FormControl {
    return this.bookForm.get('kratki_sadrzaj') as FormControl;
  }
  get genres(): FormControl {
    return this.bookForm.get('genres') as FormControl;
  }
  get godinaIzdavanja(): FormControl {
    return this.bookForm.get('godinaIzdavanja') as FormControl;
  }
}
