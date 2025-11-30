import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

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

  constructor(private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password) {
      alert('Please fill in all fields');
      return;
    }

    this.isLoading = true;
    
    console.log('Sign in attempt:', { email: this.email, password: this.password });
    
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      alert(`Welcome back! Signed in as ${this.email}`);
      // Redirect to home page
      this.router.navigate(['/']);
    }, 1000);
  }
}