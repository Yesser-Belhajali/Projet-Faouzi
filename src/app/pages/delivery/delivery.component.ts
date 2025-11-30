import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Order {
  id: string;
  storeName: string;
  storeAddress: string;
  customer: string;
  phone: string;
  address: string;
  items: string[];
  status: 'pending' | 'accepted' | 'picked_up' | 'delivered';
  amount: number;
  createdAt: Date;
}

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent {
  deliveryName = 'Ahmed Ben Ali';
  totalEarnings = 1250.50;
  completedDeliveries = 24;
  rating = 4.8;

  selectedTab: 'pending' | 'accepted' | 'delivered' = 'pending';
  selectedOrder: Order | null = null;
  showModal = false;

  orders: Order[] = [
    {
      id: 'ORD001',
      storeName: 'Burger Palace',
      storeAddress: '45 Avenue Habib Bourguiba, Tunis',
      customer: 'Sara Karim',
      phone: '+216 XX XXX XXX',
      address: '123 Main St, Tunis',
      items: ['Burger x2', 'Pizza x1', 'Drinks x3'],
      status: 'pending',
      amount: 45.50,
      createdAt: new Date('2025-11-30T10:00:00')
    },
    {
      id: 'ORD002',
      storeName: 'Sandwich House',
      storeAddress: '78 Rue de la Paix, Sfax',
      customer: 'Mohamed Saiid',
      phone: '+216 XX XXX XXX',
      address: '456 Oak Ave, Sfax',
      items: ['Sandwich x3'],
      status: 'pending',
      amount: 32.00,
      createdAt: new Date('2025-11-30T10:15:00')
    },
    {
      id: 'ORD003',
      storeName: 'Kebab Grill',
      storeAddress: '52 Rue du Port, Sousse',
      customer: 'Leila Mansouri',
      phone: '+216 XX XXX XXX',
      address: '789 Pine Rd, Sousse',
      items: ['Kebab x2', 'Salad x1'],
      status: 'accepted',
      amount: 28.75,
      createdAt: new Date('2025-11-30T09:30:00')
    },
    {
      id: 'ORD004',
      storeName: 'Tacos Express',
      storeAddress: '33 Boulevard Abou Kacem Chebbi, Kairouan',
      customer: 'Nasser Hamda',
      phone: '+216 XX XXX XXX',
      address: '321 Elm St, Kairouan',
      items: ['Tacos x4'],
      status: 'picked_up',
      amount: 55.00,
      createdAt: new Date('2025-11-30T08:45:00')
    },
    {
      id: 'ORD005',
      storeName: 'Fast Food Corner',
      storeAddress: '19 Rue de la Mer, Djerba',
      customer: 'Amira Khalil',
      phone: '+216 XX XXX XXX',
      address: '654 Maple Ln, Djerba',
      items: ['Burger x1', 'Fries x2'],
      status: 'delivered',
      amount: 38.50,
      createdAt: new Date('2025-11-30T07:00:00')
    }
  ];

  get pendingOrders(): Order[] {
    return this.orders.filter(o => o.status === 'pending');
  }

  get acceptedOrders(): Order[] {
    return this.orders.filter(o => o.status === 'accepted' || o.status === 'picked_up');
  }

  get deliveredOrders(): Order[] {
    return this.orders.filter(o => o.status === 'delivered');
  }

  acceptOrder(orderId: string) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = 'accepted';
    }
  }

  pickupOrder(orderId: string) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = 'picked_up';
    }
  }

  completeDelivery(orderId: string) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = 'delivered';
      this.completedDeliveries++;
      this.totalEarnings += order.amount * 0.15; // 15% commission
    }
  }

  rejectOrder(orderId: string) {
    this.orders = this.orders.filter(o => o.id !== orderId);
  }

  getStatusBadgeClass(status: string): string {
    switch(status) {
      case 'pending': return 'badge-pending';
      case 'accepted': return 'badge-accepted';
      case 'picked_up': return 'badge-picked';
      case 'delivered': return 'badge-delivered';
      default: return '';
    }
  }

  getStatusLabel(status: string): string {
    switch(status) {
      case 'pending': return 'Pending';
      case 'accepted': return 'Accepted';
      case 'picked_up': return 'Picked Up';
      case 'delivered': return 'Delivered';
      default: return status;
    }
  }

  selectOrder(order: Order) {
    this.selectedOrder = order;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedOrder = null;
  }
}
