import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    if (!this.email || !this.password) {
      alert('Please fill in all fields');
      return;
    }

    this.isLoading = true;
    
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.token) {
          this.authService.saveToken(response.token);
          alert(`Welcome back! Signed in as ${this.email}`);
          this.router.navigate(['/']);
        } else {
          alert('Login failed. Please try again.');
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login error:', error);
        alert('Login failed. Please check your credentials and try again.');
      }
    });
  }
}