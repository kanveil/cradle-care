import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonButton, IonIcon, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bagHandleOutline } from 'ionicons/icons';
import { ICON_MAP } from '../../data/products';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import { CheckoutModalComponent } from '../../components/checkout-modal/checkout-modal.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonButton, IonIcon],
  templateUrl: './cart.page.html',
  styleUrl: './cart.page.scss',
})
export class CartPage {
  cart = inject(CartService);
  private toast = inject(ToastService);
  private modalCtrl = inject(ModalController);
  readonly iconMap = ICON_MAP;

  constructor() {
    addIcons({ bagHandleOutline });
  }

  async checkout(): Promise<void> {
    if (this.cart.totalCount() === 0) { this.toast.show('Your cart is empty'); return; }
    const modal = await this.modalCtrl.create({ component: CheckoutModalComponent });
    await modal.present();
  }
}
