import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { exitOutline, addOutline } from 'ionicons/icons';
import { ICON_MAP } from '../../../data/products';
import { ProductService } from '../../../services/product.service';
import { ProductFormModalComponent } from '../../components/product-form-modal/product-form-modal.component';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-admin-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent],
  templateUrl: './catalog.page.html',
  styleUrl: './catalog.page.scss',
})
export class CatalogPage {
  productService = inject(ProductService);
  private modalCtrl = inject(ModalController);
  readonly iconMap = ICON_MAP;

  constructor() {
    addIcons({ exitOutline, addOutline });
  }

  async openForm(product: Product | null): Promise<void> {
    const modal = await this.modalCtrl.create({ component: ProductFormModalComponent, componentProps: { product } });
    await modal.present();
  }
}
