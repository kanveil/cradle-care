import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/tabs/admin-tabs.routes').then((m) => m.ADMIN_TABS_ROUTES),
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.TABS_ROUTES),
  },
];
