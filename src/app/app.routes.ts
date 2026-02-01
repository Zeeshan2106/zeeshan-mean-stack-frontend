import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },
  {
    path: 'auth',
    loadComponent: () => import('./components/auth/auth.component')
      .then(m => m.AuthComponent)
  },
  {
    path: 'products',
    loadComponent: () => import('./components/products/products.component')
      .then(m => m.ProductsComponent)
  },
  {
    path: 'orders',
    loadComponent: () => import('./components/orders/orders.component')
      .then(m => m.OrdersComponent)
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
