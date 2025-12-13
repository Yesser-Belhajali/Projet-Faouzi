import { Component } from '@angular/core';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [],
  template: `
    <div class="shop-container">
      <div class="container">
        <h1>Shop</h1>
        <p>Browse our amazing selection of products</p>
        
        <div class="coming-soon">
          <div class="icon">🛍️</div>
          <h2>Coming Soon!</h2>
          <p>Our shopping section is under construction. Stay tuned for exciting products!</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .shop-container {
      min-height: 80vh;
      padding: 4rem 0;
      background: var(--light-gray);
    }
    
    h1 {
      text-align: center;
      color: var(--dark-gray);
      margin-bottom: 1rem;
    }
    
    p {
      text-align: center;
      color: #666;
      margin-bottom: 3rem;
    }
    
    .coming-soon {
      background: var(--white);
      padding: 4rem 2rem;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
      text-align: center;
      max-width: 500px;
      margin: 0 auto;
    }
    
    .icon {
      font-size: 4rem;
      margin-bottom: 2rem;
    }
    
    .coming-soon h2 {
      color: var(--primary-blue);
      margin-bottom: 1rem;
    }
  `]
})
export class ShopComponent {}