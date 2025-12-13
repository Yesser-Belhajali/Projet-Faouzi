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
  unit?: string;
  inStock: boolean;
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Pain de Mie Complet',
      description: 'Pain de mie complet aux céréales',
      price: 2.50,
      image: '/images/bread.jpg',
      category: 'Boulangerie',
      store: 'Boulangerie Martin',
      unit: 'pièce',
      inStock: true
    },
    {
      id: 2,
      name: 'Lait Demi-Écrémé',
      description: 'Lait frais demi-écrémé 1L',
      price: 1.20,
      image: '/images/milk.jpg',
      category: 'Produits Laitiers',
      store: 'Ferme Durand',
      unit: '1L',
      inStock: true
    },
    {
      id: 3,
      name: 'Bananes Bio',
      description: 'Bananes biologiques d\'Équateur',
      price: 2.99,
      image: '/images/bananas.jpg',
      category: 'Fruits',
      store: 'Bio Market',
      unit: 'kg',
      inStock: true
    },
    {
      id: 4,
      name: 'Tomates Cerises',
      description: 'Tomates cerises fraîches de saison',
      price: 3.50,
      image: '/images/tomatoes.jpg',
      category: 'Légumes',
      store: 'Maraîcher Local',
      unit: '250g',
      inStock: true
    },
    {
      id: 5,
      name: 'Poulet Fermier',
      description: 'Escalopes de poulet fermier',
      price: 8.99,
      image: '/images/chicken.jpg',
      category: 'Viandes',
      store: 'Boucherie Tradition',
      unit: '500g',
      inStock: true
    },
    {
      id: 6,
      name: 'Saumon Frais',
      description: 'Filets de saumon d\'Atlantique',
      price: 15.99,
      image: '/images/salmon.jpg',
      category: 'Poissons',
      store: 'Poissonnerie des Halles',
      unit: '300g',
      inStock: false
    },
    {
      id: 7,
      name: 'Yaourts Nature',
      description: 'Pack de 8 yaourts nature bio',
      price: 4.20,
      image: '/images/yogurt.jpg',
      category: 'Produits Laitiers',
      store: 'Ferme Durand',
      unit: 'pack de 8',
      inStock: true
    },
    {
      id: 8,
      name: 'Pâtes Italiennes',
      description: 'Spaghettis artisanaux italiens',
      price: 3.80,
      image: '/images/pasta.jpg',
      category: 'Épicerie',
      store: 'Épicerie Fine',
      unit: '500g',
      inStock: true
    },
    {
      id: 9,
      name: 'Fromage Camembert',
      description: 'Camembert de Normandie AOP',
      price: 4.50,
      image: '/images/camembert.jpg',
      category: 'Fromages',
      store: 'Fromagerie Artisanale',
      unit: 'pièce',
      inStock: true
    },
    {
      id: 10,
      name: 'Pommes Golden',
      description: 'Pommes Golden délicieuses',
      price: 2.30,
      image: '/images/apples.jpg',
      category: 'Fruits',
      store: 'Verger du Soleil',
      unit: 'kg',
      inStock: true
    }
  ];

  cart: Product[] = [];
  categories: string[] = ['Tous', 'Fruits', 'Légumes', 'Viandes', 'Poissons', 'Produits Laitiers', 'Fromages', 'Boulangerie', 'Épicerie'];
  selectedCategory: string = 'Tous';

  get filteredProducts(): Product[] {
    if (this.selectedCategory === 'Tous') {
      return this.products;
    }
    return this.products.filter(product => product.category === this.selectedCategory);
  }

  addToCart(product: Product): void {
    if (!product.inStock) {
      alert('Ce produit n\'est pas disponible en stock.');
      return;
    }
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