import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonBadge,
  ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { notificationsOutline } from 'ionicons/icons';
import { CATEGORY_FILTERS } from '../../data/products';
import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../services/notification.service';
import { NotificationsModalComponent } from '../../components/notifications-modal/notifications-modal.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonBadge,
    ProductCardComponent,
  ],
  templateUrl: './shop.page.html',
  styleUrl: './shop.page.scss',
})
export class ShopPage {
  private modalCtrl = inject(ModalController);
  private productService = inject(ProductService);
  notifications = inject(NotificationService);

  readonly filters = CATEGORY_FILTERS;
  readonly activeFilter = signal('all');

  readonly filteredProducts = computed(() => {
    const filter = this.activeFilter();
    const all = this.productService.products();
    return filter === 'all' ? all : all.filter((p) => p.cat === filter);
  });

  constructor() {
    addIcons({ notificationsOutline });
  }

  setFilter(value: string): void {
    this.activeFilter.set(value);
  }

  async openNotifications(): Promise<void> {
    const modal = await this.modalCtrl.create({ component: NotificationsModalComponent, breakpoints: [0, 0.7], initialBreakpoint: 0.7 });
    await modal.present();
  }
}
