import { Routes } from '@angular/router';
import { AdminTabsPage } from './admin-tabs.page';

export const ADMIN_TABS_ROUTES: Routes = [
  {
    path: '',
    component: AdminTabsPage,
    children: [
      { path: 'dashboard', loadComponent: () => import('../pages/dashboard/dashboard.page').then((m) => m.DashboardPage) },
      { path: 'customers', loadComponent: () => import('../pages/customers/customers.page').then((m) => m.CustomersPage) },
      { path: 'catalog', loadComponent: () => import('../pages/catalog/catalog.page').then((m) => m.CatalogPage) },
      { path: 'orders', loadComponent: () => import('../pages/orders/orders.page').then((m) => m.AdminOrdersPage) },
      { path: 'inventory', loadComponent: () => import('../pages/inventory/inventory.page').then((m) => m.InventoryPage) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
