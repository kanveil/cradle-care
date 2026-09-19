import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const TABS_ROUTES: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      { path: 'home', loadComponent: () => import('../pages/home/home.page').then((m) => m.HomePage) },
      { path: 'shop', loadComponent: () => import('../pages/shop/shop.page').then((m) => m.ShopPage) },
      { path: 'wishlist', loadComponent: () => import('../pages/wishlist/wishlist.page').then((m) => m.WishlistPage) },
      { path: 'cart', loadComponent: () => import('../pages/cart/cart.page').then((m) => m.CartPage) },
      { path: 'account', loadComponent: () => import('../pages/account/account.page').then((m) => m.AccountPage) },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
