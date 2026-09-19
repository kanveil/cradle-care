import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { exitOutline, trendingUpOutline, cartOutline, walletOutline, alertCircleOutline } from 'ionicons/icons';
import { OrderService } from '../../../services/order.service';
import { CustomerService } from '../../../services/customer.service';
import { ProductService } from '../../../services/product.service';
import { ICON_MAP } from '../../../data/products';

interface DayBucket { label: string; total: number; }
interface TopProduct { id: number; name: string; icon: string; qty: number; revenue: number; }

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
})
export class DashboardPage {
  orderService = inject(OrderService);
  customerService = inject(CustomerService);
  productService = inject(ProductService);
  readonly iconMap = ICON_MAP;

  constructor() {
    addIcons({ exitOutline, trendingUpOutline, cartOutline, walletOutline, alertCircleOutline });
  }

  readonly totalRevenue = computed(() => this.orderService.orders().reduce((sum, o) => sum + o.total, 0));
  readonly totalOrders = computed(() => this.orderService.orders().length);
  readonly avgOrderValue = computed(() => (this.totalOrders() ? this.totalRevenue() / this.totalOrders() : 0));

  readonly last7Days = computed<DayBucket[]>(() => {
    const buckets: DayBucket[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const label = d.toLocaleDateString(undefined, { weekday: 'short' });
      const dayKey = d.toDateString();
      const total = this.orderService.orders()
        .filter((o) => new Date(o.createdAt).toDateString() === dayKey)
        .reduce((sum, o) => sum + o.total, 0);
      buckets.push({ label, total });
    }
    return buckets;
  });

  readonly maxDayTotal = computed(() => Math.max(1, ...this.last7Days().map((d) => d.total)));

  readonly topProducts = computed<TopProduct[]>(() => {
    const tally = new Map<number, TopProduct>();
    for (const order of this.orderService.orders()) {
      for (const item of order.items) {
        const existing = tally.get(item.id);
        if (existing) {
          existing.qty += item.qty;
          existing.revenue += item.price * item.qty;
        } else {
          tally.set(item.id, { id: item.id, name: item.name, icon: item.icon, qty: item.qty, revenue: item.price * item.qty });
        }
      }
    }
    return [...tally.values()].sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  });

  readonly maxTopRevenue = computed(() => Math.max(1, ...this.topProducts().map((p) => p.revenue)));

  barHeight(total: number): number {
    return Math.max(4, Math.round((total / this.maxDayTotal()) * 100));
  }

  barWidth(revenue: number): number {
    return Math.max(4, Math.round((revenue / this.maxTopRevenue()) * 100));
  }
}
