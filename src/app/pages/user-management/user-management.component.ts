import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
  registrationDate: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  users: User[] = [
    {
      id: 1,
      name: 'Mustapha Labyedh',
      email: 'yacoubhend@gmail.com',
      role: 'Customer',
      phone: '11111111',
      registrationDate: '15/07/2025'
    },
    {
      id: 2,
      name: 'Derrick Spencer',
      email: '1640.26 DT',
      role: 'Delivery Partner',
      phone: '5555',
      registrationDate: '75 Premium'
    },
    {
      id: 3,
      name: 'Derrick Spencer',
      email: '1640.26 DT',
      role: 'Provider',
      phone: '111111',
      registrationDate: '75 Premium'
    },
    {
      id: 4,
      name: 'Derrick Spencer',
      email: '1640.26 DT',
      role: 'Customer',
      phone: '5410',
      registrationDate: '75 Premium'
    },
    {
      id: 5,
      name: 'Derrick Spencer',
      email: '1640.26 DT',
      role: 'Delivery Partner',
      phone: '6516134',
      registrationDate: '75 Premium'
    },
    {
      id: 6,
      name: 'Derrick Spencer',
      email: '1640.26 DT',
      role: 'Provider',
      phone: '4841498',
      registrationDate: '75 Premium'
    }
  ];

  searchTerm: string = '';
  selectedRole: string = 'all';

  get filteredUsers() {
    return this.users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesRole = this.selectedRole === 'all' || user.role.toLowerCase() === this.selectedRole.toLowerCase();
      return matchesSearch && matchesRole;
    });
  }

  editUser(userId: number) {
    console.log('Edit user:', userId);
    // Implement edit functionality
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users = this.users.filter(user => user.id !== userId);
    }
  }

  addNewUser() {
    console.log('Add new user');
    // Implement add user functionality
  }
}