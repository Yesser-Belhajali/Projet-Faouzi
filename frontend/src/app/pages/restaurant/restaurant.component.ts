import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent implements OnInit {
  cartItems: Product[] = [];
  products: Product[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.error = null;
    
    this.productService.getRestaurantProducts().subscribe({
      next: (response: any) => {
        if (response && response.products) {
          this.products = response.products;
        } else if (Array.isArray(response)) {
          this.products = response;
        } else {
          this.products = this.staticProducts;
        }
        
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement des produits, utilisation des produits statiques:', error);
        this.products = this.staticProducts;
        this.loading = false;
        this.error = null;
        this.cdr.detectChanges();
      }
    });
  }

  // Backup static products in case API fails
  staticProducts: Product[] = [
    {
      id: 1,
      name: "Pizza Margherita",
      description: "Pizza classique avec tomates, mozzarella et basilic frais",
      price: 18.50,
      image: "🍕",
      type: "restaurant",
      restaurant: "Bella Italia",
      store_id: 1
    },
    {
      id: 2,
      name: "Burger Royal",
      description: "Burger avec steak, fromage, salade, tomate et sauce spéciale",
      price: 22.00,
      image: "🍔",
      type: "restaurant",
      restaurant: "Fast Gourmet",
      store_id: 2
    },
    {
      id: 3,
      name: "Sushi Mix",
      description: "Assortiment de 12 sushi variés avec wasabi et gingembre",
      price: 28.00,
      image: "🍣",
      type: "restaurant",
      restaurant: "Tokyo Express",
      store_id: 3
    },
    {
      id: 4,
      name: "Tacos Mexicains",
      description: "3 tacos au poulet avec guacamole, salsa et coriandre",
      price: 16.50,
      image: "🌮",
      type: "restaurant",
      restaurant: "El Sombrero",
      store_id: 4
    },
    {
      id: 5,
      name: "Pâtes Carbonara",
      description: "Spaghetti à la carbonara avec lardons et parmesan",
      price: 19.00,
      image: "🍝",
      type: "restaurant",
      restaurant: "Bella Italia",
      store_id: 1
    },
    {
      id: 6,
      name: "Salade César",
      description: "Salade fraîche avec poulet grillé, croûtons et parmesan",
      price: 14.50,
      image: "🥗",
      type: "restaurant",
      restaurant: "Green Garden",
      store_id: 5
    }
  ];

  addToCart(product: Product) {
    this.cartItems.push(product);
    alert(`${product.name} ajouté au panier !`);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  getProductEmoji(productName: string): string {
    const name = productName.toLowerCase();
    
    if (name.includes('burger') || name.includes('royal')) return '🍔';
    if (name.includes('pizza')) return '🍕';
    if (name.includes('sushi')) return '🍣';
    if (name.includes('taco')) return '🌮';
    if (name.includes('pasta') || name.includes('spaghetti')) return '🍝';
    if (name.includes('salade') || name.includes('salad')) return '🥗';
    if (name.includes('sandwich')) return '🥪';
    if (name.includes('frites') || name.includes('fries')) return '🍟';
    if (name.includes('poulet') || name.includes('chicken')) return '🍗';
    if (name.includes('poisson') || name.includes('fish')) return '🐟';
    
    return '🍽️'; // Emoji par défaut
  }
}