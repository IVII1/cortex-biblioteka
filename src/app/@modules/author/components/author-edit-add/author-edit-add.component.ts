import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from '../../models/author.model';
import { AuthorService } from '../../services/author.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-author-edit-add',
  templateUrl: './author-edit-add.component.html',
  styleUrl: './author-edit-add.component.scss',
})
export class AuthorEditAddComponent {
  author = this.route.snapshot.data['author'] ?? new Author();
  form!: FormGroup;
  authorService = inject(AuthorService);
  errorMessage: string = '';
  public Editor = ClassicEditor;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [this.author?.name ?? '', Validators.required],
      surname: [this.author?.surname ?? ''],
      biography: [this.author?.bio ?? '', Validators.required],
      image: ['http://library.test/img/profile.jpg', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.authorService.save(this.form.value, this.author?.id).subscribe({
        next: () => {
          this.router.navigate(['/authors']);
        },
        error: () => {},
      });
    } else {
      this.errorMessage = 'Form is invalid, please fill out all the fields.';
    }
  }
  onCancel() {
    this.router.navigate(['/authors']);
  }
}
