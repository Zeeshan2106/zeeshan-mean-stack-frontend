import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  isLogin = true;
  loading = signal(false);
  error = signal<string | null>(null);
  success = signal<string | null>(null);

  formData = {
    username: '',
    password: ''
  };

  toggleMode() {
    this.isLogin = !this.isLogin;
    this.error.set(null);
    this.success.set(null);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.error.set(null);
    this.success.set(null);
    this.loading.set(true);

    if (this.isLogin) {
      this.login();
    } else {
      this.register();
    }
  }

  login() {
    this.userService.login(this.formData).subscribe({
      next: (response) => {
        this.loading.set(false);
        this.success.set('Login successful! Redirecting...');
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.message || 'Login failed');
      }
    });
  }

  register() {
    this.userService.register(this.formData).subscribe({
      next: (response) => {
        this.loading.set(false);
        this.success.set('Registration successful! Please login.');
        setTimeout(() => {
          this.isLogin = true;
        }, 1500);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.message || 'Registration failed');
      }
    });
  }
}