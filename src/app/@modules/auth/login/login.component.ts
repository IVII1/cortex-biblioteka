import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      device: new FormControl('DivajsNejm'),
    });
  }
  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/books']);
        this.toastr.success('Welcome!');
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Wrong credentials, please try again');
      },
    });
  }
}
