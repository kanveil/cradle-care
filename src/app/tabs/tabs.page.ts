import { Component } from '@angular/core';
import {
  IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  home, homeOutline, storefront, storefrontOutline, heart, heartOutline,
  bagHandle, bagHandleOutline, person, personOutline,
} from 'ionicons/icons';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge],
  templateUrl: './tabs.page.html',
  styleUrl: './tabs.page.scss',
})
export class TabsPage {
  constructor(public cart: CartService, public wishlist: WishlistService) {
    addIcons({
      home, homeOutline, storefront, storefrontOutline, heart, heartOutline,
      bagHandle, bagHandleOutline, person, personOutline,
    });
  }
}
