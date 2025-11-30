import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Deluxe Burger',
      price: 12.99,
      quantity: 2,
      image: 'https://via.placeholder.com/100?text=Burger',
      category: 'Restaurant'
    },
    {
      id: 2,
      name: 'T-Shirt Premium',
      price: 29.99,
      quantity: 1,
      image: 'https://via.placeholder.com/100?text=Tshirt',
      category: 'Boutique'
    },
    {
      id: 3,
      name: 'Vitamins Pack',
      price: 19.99,
      quantity: 1,
      image: 'https://via.placeholder.com/100?text=Vitamins',
      category: 'Pharmacie'
    }
  ];

  constructor(private router: Router) {}

  updateQuantity(itemId: number, newQuantity: number) {
    if (newQuantity < 1) {
      this.removeItem(itemId);
      return;
    }
    const item = this.cartItems.find(i => i.id === itemId);
    if (item) {
      item.quantity = newQuantity;
    }
  }

  removeItem(itemId: number) {
    this.cartItems = this.cartItems.filter(i => i.id !== itemId);
  }

  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  get tax(): number {
    return this.subtotal * 0.1;
  }

  get total(): number {
    return this.subtotal + this.tax;
  }

  checkout() {
    alert('Proceeding to checkout with total: ' + this.total.toFixed(2) + ' DT');
  }

  continueShopping() {
    // Navigate back to home
    this.router.navigate(['/']);
  }
}
