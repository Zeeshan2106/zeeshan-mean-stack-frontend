import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductService } from '../../core/services/product.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  editingProduct = signal<Product | null>(null);
  showForm = false;

  formData: Product = {
    name: '',
    price: 0,
    description: ''
  };

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading.set(true);
    this.error.set(null);

    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products.set(response.data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load products');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.editingProduct()) {
      this.updateProduct();
    } else {
      this.createProduct();
    }
  }

  createProduct() {
    this.productService.createProduct(this.formData).subscribe({
      next: (response) => {
        this.loadProducts();
        this.resetForm();
        this.showForm = false;
      },
      error: (err) => {
        this.error.set('Failed to create product');
        console.error(err);
      }
    });
  }

  updateProduct() {
    const id = this.editingProduct()?._id;
    if (!id) return;

    this.productService.updateProduct(id, this.formData).subscribe({
      next: (response) => {
        this.loadProducts();
        this.resetForm();
        this.showForm = false;
      },
      error: (err) => {
        this.error.set('Failed to update product');
        console.error(err);
      }
    });
  }

  editProduct(product: Product) {
    this.editingProduct.set(product);
    this.formData = { ...product };
    this.showForm = true;
  }

  deleteProduct(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: (err) => {
        this.error.set('Failed to delete product');
        console.error(err);
      }
    });
  }

  cancelEdit() {
    this.resetForm();
    this.showForm = false;
  }

  resetForm() {
    this.formData = {
      name: '',
      price: 0,
      description: ''
    };
    this.editingProduct.set(null);
  }
}