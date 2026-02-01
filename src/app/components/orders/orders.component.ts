import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order } from '../../models/order.model';
import { Product } from '../../models/product.model';
import { OrderService } from '../../core/services/order.service';
import { ProductService } from '../../core/services/product.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  private orderService = inject(OrderService);
  private productService = inject(ProductService);
  userService = inject(UserService);

  orders = signal<Order[]>([]);
  products = signal<Product[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  selectedProductIds: string[] = [];

  ngOnInit() {
    this.loadOrders();
    this.loadProducts();
  }

  loadOrders() {
    this.loading.set(true);
    this.orderService.getOrders().subscribe({
      next: (response) => {
        this.orders.set(response.data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load orders');
        this.loading.set(false);
      }
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products.set(response.data);
      },
      error: (err) => {
        console.error('Failed to load products', err);
      }
    });
  }

  createOrder(event: Event) {
    event.preventDefault();
    
    const currentUser = this.userService.currentUser();
    if (!currentUser) {
      this.error.set('Please login first');
      return;
    }

    if (this.selectedProductIds.length === 0) {
      this.error.set('Please select at least one product');
      return;
    }

    const orderData = {
      userId: currentUser.userId,
      productIds: this.selectedProductIds
    };

    this.orderService.createOrder(orderData).subscribe({
      next: () => {
        this.loadOrders();
        this.selectedProductIds = [];
        this.error.set(null);
      },
      error: (err) => {
        this.error.set('Failed to create order');
      }
    });
  }

  deleteOrder(id: string) {
    if (!confirm('Delete this order?')) return;

    this.orderService.deleteOrder(id).subscribe({
      next: () => {
        this.loadOrders();
      },
      error: (err) => {
        this.error.set('Failed to delete order');
      }
    });
  }

  getOrderProducts(order: Order): Product[] {
    if (Array.isArray(order.productIds) && order.productIds.length > 0 && typeof order.productIds[0] === 'object') {
      return order.productIds as Product[];
    }
    return [];
  }
}
