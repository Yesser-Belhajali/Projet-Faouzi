import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from './services/admin.service';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-test-api',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px;">
      <h2>API Connection Test</h2>
      
      <div *ngIf="isLoading">Loading...</div>
      
      <div *ngIf="!isLoading">
        <h3>Dashboard Stats:</h3>
        <pre>{{ dashboardData | json }}</pre>

        <h3>Products:</h3>
        <pre>{{ productsData | json }}</pre>

        <div *ngIf="error" style="color: red;">
          <h3>Error:</h3>
          <p>{{ error }}</p>
        </div>
      </div>
    </div>
  `
})
export class TestApiComponent implements OnInit {
  dashboardData: any = null;
  productsData: any = null;
  isLoading = true;
  error = '';

  constructor(
    private adminService: AdminService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    console.log('Testing API connection...');

    // Test Admin API
    this.adminService.getDashboardStats().subscribe({
      next: (data) => {
        console.log('Dashboard data:', data);
        this.dashboardData = data;
        this.testProducts();
      },
      error: (err) => {
        console.error('Dashboard error:', err);
        this.error = 'Failed to connect to backend: ' + err.message;
        this.isLoading = false;
      }
    });
  }

  testProducts() {
    this.productService.getProducts({ limit: 5 }).subscribe({
      next: (data) => {
        console.log('Products data:', data);
        this.productsData = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Products error:', err);
        this.error = 'Failed to get products: ' + err.message;
        this.isLoading = false;
      }
    });
  }
}
