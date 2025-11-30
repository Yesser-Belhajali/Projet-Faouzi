import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  accountType: 'customer' | 'delivery' | 'provider' = 'customer';
  isLoading: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    if (!this.firstName || !this.lastName || !this.email || !this.password) {
      alert('Please fill in all fields');
      return;
    }

    this.isLoading = true;
    
    console.log('Sign up attempt:', { 
      firstName: this.firstName, 
      lastName: this.lastName,
      email: this.email, 
      password: this.password,
      accountType: this.accountType
    });
    
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      alert(`Account created successfully for ${this.firstName} ${this.lastName}!`);
      // Redirect to signin page
      this.router.navigate(['/signin']);
    }, 1000);
  }
}