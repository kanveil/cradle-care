import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heartOutline } from 'ionicons/icons';
import { ICON_MAP } from '../../data/products';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon],
  templateUrl: './wishlist.page.html',
  styleUrl: './wishlist.page.scss',
})
export class WishlistPage {
  wishlist = inject(WishlistService);
  private cart = inject(CartService);
  private toast = inject(ToastService);
  readonly iconMap = ICON_MAP;

  constructor() {
    addIcons({ heartOutline });
  }

  addToCart(id: number): void {
    this.cart.add(id);
    this.toast.show('Added to cart');
  }

  remove(id: number): void {
    this.wishlist.remove(id);
    this.toast.show('Removed from wishlist');
  }
}
