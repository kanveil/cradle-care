import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { exitOutline } from 'ionicons/icons';
import { OrderService } from '../../../services/order.service';
import { OrderDetailModalComponent } from '../../../components/order-detail-modal/order-detail-modal.component';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent],
  templateUrl: './orders.page.html',
  styleUrl: './orders.page.scss',
})
export class AdminOrdersPage {
  orderService = inject(OrderService);
  private modalCtrl = inject(ModalController);

  readonly statusLabels = this.orderService.statusLabels;
  readonly activeFilter = signal<number | -1>(-1);

  readonly filteredOrders = computed(() => {
    const filter = this.activeFilter();
    const orders = this.orderService.orders();
    if (filter === -1) return orders;
    return orders.filter((o) => this.orderService.statusInfo(o).index === filter);
  });

  constructor() {
    addIcons({ exitOutline });
  }

  setFilter(index: number | -1): void {
    this.activeFilter.set(index);
  }

  statusOf(order: Order): number {
    return this.orderService.statusInfo(order).index;
  }

  advanceStatus(order: Order, event: Event): void {
    event.stopPropagation();
    const current = this.statusOf(order);
    if (current >= 3) return;
    this.orderService.setManualStatus(order.id, current + 1);
  }

  async view(order: Order): Promise<void> {
    const modal = await this.modalCtrl.create({ component: OrderDetailModalComponent, componentProps: { order } });
    await modal.present();
  }
}
