import { Component, inject } from '@angular/core';
import { Librarian } from '../../models/librarian.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LibrarianService } from '../../services/librarian.service';

@Component({
  selector: 'app-librarian-edit-add',
  templateUrl: './librarian-edit-add.component.html',
  styleUrl: './librarian-edit-add.component.scss',
})
export class LibrarianEditAddComponent {
  librarian!: Librarian | null;
  form!: FormGroup;
  librarianService = inject(LibrarianService);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.librarian = this.route.snapshot.data['librarian'] || null;
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [this.librarian?.name ?? '', Validators.required],
      surname: [this.librarian?.surname ?? ''],
      role_id: [this.librarian?.role ?? '', Validators.required],
      email: [
        this.librarian?.email ?? '',
        [Validators.required, Validators.email],
      ],
      jmbg: [this.librarian?.jmbg ?? '', Validators.required],
      username: [this.librarian?.username ?? '', Validators.required],
      password: ['12345678', Validators.required],
      password_confirmation: ['12345678', Validators.required],
      photoPath: ['http://library.test/img/profile.jpg', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.librarianService.save(this.form.value, this.librarian?.id);
    }
  }
}
