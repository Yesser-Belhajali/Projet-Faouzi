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
  restaurant?: string;
}

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent {
  cartItems: Product[] = [];
  
  products: Product[] = [
    {
      id: 1,
      name: "Pizza Margherita",
      description: "Pizza classique avec tomates, mozzarella et basilic frais",
      price: 18.50,
      image: "🍕",
      category: "Pizza",
      restaurant: "Bella Italia"
    },
    {
      id: 2,
      name: "Burger Royal",
      description: "Burger avec steak, fromage, salade, tomate et sauce spéciale",
      price: 22.00,
      image: "🍔",
      category: "Burger",
      restaurant: "Fast Gourmet"
    },
    {
      id: 3,
      name: "Sushi Mix",
      description: "Assortiment de 12 sushi variés avec wasabi et gingembre",
      price: 28.00,
      image: "🍣",
      category: "Japonais",
      restaurant: "Tokyo Express"
    },
    {
      id: 4,
      name: "Tacos Mexicains",
      description: "3 tacos au poulet avec guacamole, salsa et coriandre",
      price: 16.50,
      image: "🌮",
      category: "Mexicain",
      restaurant: "El Sombrero"
    },
    {
      id: 5,
      name: "Pâtes Carbonara",
      description: "Spaghetti à la carbonara avec lardons et parmesan",
      price: 19.00,
      image: "🍝",
      category: "Italien",
      restaurant: "Bella Italia"
    },
    {
      id: 6,
      name: "Salade César",
      description: "Salade fraîche avec poulet grillé, croûtons et parmesan",
      price: 14.50,
      image: "🥗",
      category: "Salade",
      restaurant: "Green Garden"
    }
  ];

  addToCart(product: Product) {
    this.cartItems.push(product);
    alert(`${product.name} ajouté au panier !`);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }
}