import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, heartOutline, add } from 'ionicons/icons';
import { Product } from '../../models/product.model';
import { ICON_MAP } from '../../data/products';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, IonIcon, IonButton],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  private cart = inject(CartService);
  private wishlist = inject(WishlistService);
  private toast = inject(ToastService);

  readonly iconMap = ICON_MAP;
  justAdded = false;

  constructor() {
    addIcons({ heart, heartOutline, add });
  }

  get art() {
    return this.iconMap[this.product.icon];
  }

  isWished(): boolean {
    return this.wishlist.has(this.product.id);
  }

  onToggleWishlist(): void {
    const added = this.wishlist.toggle(this.product.id);
    this.toast.show(added ? 'Saved to wishlist ♥' : 'Removed from wishlist');
  }

  onAddToCart(): void {
    if (this.product.stock <= 0) { this.toast.show('Out of stock'); return; }
    this.cart.add(this.product.id);
    this.toast.show('Added to cart');
    this.justAdded = true;
    setTimeout(() => (this.justAdded = false), 900);
  }
}
