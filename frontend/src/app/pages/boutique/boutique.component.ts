import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  store: string;
}

@Component({
  selector: 'app-boutique',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './boutique.component.html',
  styleUrl: './boutique.component.css'
})
export class BoutiqueComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'T-Shirt Premium',
      description: 'T-shirt en coton bio de haute qualité',
      price: 29.99,
      image: '/images/tshirt.jpg',
      category: 'Vêtements',
      store: 'Fashion Store'
    },
    {
      id: 2,
      name: 'Jeans Slim',
      description: 'Jean slim fit confortable et élégant',
      price: 79.99,
      image: '/images/jeans.jpg',
      category: 'Vêtements',
      store: 'Fashion Store'
    },
    {
      id: 3,
      name: 'Sneakers Sport',
      description: 'Baskets de sport ultra-confortables',
      price: 89.99,
      image: '/images/sneakers.jpg',
      category: 'Chaussures',
      store: 'Sports World'
    },
    {
      id: 4,
      name: 'Sac à Main',
      description: 'Sac à main en cuir véritable',
      price: 149.99,
      image: '/images/handbag.jpg',
      category: 'Accessoires',
      store: 'Luxury Bags'
    },
    {
      id: 5,
      name: 'Montre Connectée',
      description: 'Montre intelligente avec GPS intégré',
      price: 199.99,
      image: '/images/smartwatch.jpg',
      category: 'Électronique',
      store: 'Tech Corner'
    },
    {
      id: 6,
      name: 'Casque Audio',
      description: 'Casque sans fil haute définition',
      price: 129.99,
      image: '/images/headphones.jpg',
      category: 'Électronique',
      store: 'Tech Corner'
    },
    {
      id: 7,
      name: 'Parfum Luxe',
      description: 'Parfum de luxe aux notes florales',
      price: 89.99,
      image: '/images/perfume.jpg',
      category: 'Beauté',
      store: 'Beauty Palace'
    },
    {
      id: 8,
      name: 'Bijoux Élégants',
      description: 'Collier en or avec pendentif diamant',
      price: 299.99,
      image: '/images/jewelry.jpg',
      category: 'Bijoux',
      store: 'Jewelry Store'
    }
  ];

  cart: Product[] = [];
  categories: string[] = ['Tous', 'Vêtements', 'Chaussures', 'Accessoires', 'Électronique', 'Beauté', 'Bijoux'];
  selectedCategory: string = 'Tous';

  get filteredProducts(): Product[] {
    if (this.selectedCategory === 'Tous') {
      return this.products;
    }
    return this.products.filter(product => product.category === this.selectedCategory);
  }

  addToCart(product: Product): void {
    this.cart.push(product);
  }

  removeFromCart(product: Product): void {
    const index = this.cart.findIndex(item => item.id === product.id);
    if (index > -1) {
      this.cart.splice(index, 1);
    }
  }

  getTotalPrice(): number {
    return this.cart.reduce((total, product) => total + product.price, 0);
  }

  getTotalItems(): number {
    return this.cart.length;
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
  }
}