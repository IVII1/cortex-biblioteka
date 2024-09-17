import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from '../../models/author.model';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-author-edit-add',
  templateUrl: './author-edit-add.component.html',
  styleUrl: './author-edit-add.component.scss',
})
export class AuthorEditAddComponent {
  author!: Author | null;
  form!: FormGroup;
  authorService = inject(AuthorService);
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.author = this.route.snapshot.data['author'] || null;
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [this.author?.name ?? '', Validators.required],
      surname: [this.author?.surname ?? ''],
      role_id: [this.author?.role ?? '', Validators.required],
      email: [
        this.author?.email ?? '',
        [Validators.required, Validators.email],
      ],
      jmbg: [this.author?.jmbg ?? '', Validators.required],
      username: [this.author?.username ?? '', Validators.required],
      password: ['12345678', Validators.required],
      password_confirmation: ['12345678', Validators.required],
      photoPath: ['http://library.test/img/profile.jpg', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.authorService.save(this.form.value, this.author?.id).subscribe({
        next: () => {
          this.router.navigate(['/students']);
        },
        error: () => {
          console.log('Error saving author');
        },
      });
    } else {
      this.errorMessage = 'Form is invalid, please fill out all the fields.';
    }
  }
  onCancel() {
    this.router.navigate(['/authors']);
  }
}
