import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { exitOutline } from 'ionicons/icons';
import { ICON_MAP } from '../../../data/products';
import { ProductService } from '../../../services/product.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-admin-inventory',
  standalone: true,
  imports: [CommonModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent],
  templateUrl: './inventory.page.html',
  styleUrl: './inventory.page.scss',
})
export class InventoryPage {
  productService = inject(ProductService);
  private toast = inject(ToastService);
  readonly iconMap = ICON_MAP;

  readonly sortedProducts = computed(() =>
    [...this.productService.products()].sort((a, b) => a.stock - b.stock)
  );

  constructor() {
    addIcons({ exitOutline });
  }

  adjust(id: number, delta: number): void {
    this.productService.adjustStock(id, delta);
  }

  restock(id: number, name: string): void {
    this.productService.adjustStock(id, 25);
    this.toast.show(`Restocked ${name} (+25 units)`);
  }
}
