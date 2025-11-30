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
  pharmacy: string;
  prescription?: boolean;
}

@Component({
  selector: 'app-pharmacie',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pharmacie.component.html',
  styleUrl: './pharmacie.component.css'
})
export class PharmacieComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Paracétamol 1g',
      description: 'Médicament contre la douleur et la fièvre',
      price: 3.50,
      image: '/images/paracetamol.jpg',
      category: 'Médicaments',
      pharmacy: 'Pharmacie Centrale',
      prescription: false
    },
    {
      id: 2,
      name: 'Vitamine C 500mg',
      description: 'Complément alimentaire vitamine C',
      price: 8.99,
      image: '/images/vitamin-c.jpg',
      category: 'Vitamines',
      pharmacy: 'Pharmacie Centrale'
    },
    {
      id: 3,
      name: 'Thermomètre Digital',
      description: 'Thermomètre médical précis',
      price: 12.99,
      image: '/images/thermometer.jpg',
      category: 'Matériel Médical',
      pharmacy: 'Pharmacie du Centre'
    },
    {
      id: 4,
      name: 'Masques Chirurgicaux',
      description: 'Boîte de 50 masques chirurgicaux',
      price: 15.99,
      image: '/images/masks.jpg',
      category: 'Protection',
      pharmacy: 'Pharmacie du Centre'
    },
    {
      id: 5,
      name: 'Gel Hydroalcoolique',
      description: 'Gel désinfectant pour les mains 250ml',
      price: 4.50,
      image: '/images/hand-gel.jpg',
      category: 'Hygiène',
      pharmacy: 'Pharmacie Moderne'
    },
    {
      id: 6,
      name: 'Tensiodomètre',
      description: 'Appareil de mesure de tension artérielle',
      price: 45.99,
      image: '/images/blood-pressure.jpg',
      category: 'Matériel Médical',
      pharmacy: 'Pharmacie Moderne'
    },
    {
      id: 7,
      name: 'Crème Hydratante',
      description: 'Crème hydratante pour peaux sensibles',
      price: 12.50,
      image: '/images/moisturizer.jpg',
      category: 'Cosmétiques',
      pharmacy: 'Pharmacie Beauté'
    },
    {
      id: 8,
      name: 'Antibiotique',
      description: 'Amoxicilline 500mg - Sur ordonnance',
      price: 18.90,
      image: '/images/antibiotic.jpg',
      category: 'Médicaments',
      pharmacy: 'Pharmacie Centrale',
      prescription: true
    }
  ];

  cart: Product[] = [];
  categories: string[] = ['Tous', 'Médicaments', 'Vitamines', 'Matériel Médical', 'Protection', 'Hygiène', 'Cosmétiques'];
  selectedCategory: string = 'Tous';

  get filteredProducts(): Product[] {
    if (this.selectedCategory === 'Tous') {
      return this.products;
    }
    return this.products.filter(product => product.category === this.selectedCategory);
  }

  addToCart(product: Product): void {
    if (product.prescription) {
      alert('Ce médicament nécessite une ordonnance. Veuillez consulter votre médecin.');
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