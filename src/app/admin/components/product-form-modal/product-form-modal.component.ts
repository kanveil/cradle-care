import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonInput, IonTextarea,
  IonSelect, IonSelectOption, ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { CATEGORY_OPTIONS, ICON_MAP, ICON_OPTIONS } from '../../../data/products';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-form-modal',
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent,
    IonInput, IonTextarea, IonSelect, IonSelectOption,
  ],
  templateUrl: './product-form-modal.component.html',
  styleUrl: './product-form-modal.component.scss',
})
export class ProductFormModalComponent {
  /** Pass an existing product to edit; omit to create a new one. */
  @Input() product: Product | null = null;

  private modalCtrl = inject(ModalController);
  private productService = inject(ProductService);

  readonly categoryOptions = CATEGORY_OPTIONS;
  readonly iconOptions = ICON_OPTIONS;
  readonly iconMap = ICON_MAP;

  name = '';
  cat: Product['cat'] = 'feeding';
  price = 0;
  stock = 0;
  icon: Product['icon'] = 'bottle';
  desc = '';
  errors = { name: false, price: false, stock: false, desc: false };

  constructor() {
    addIcons({ close });
  }

  ngOnInit(): void {
    if (this.product) {
      this.name = this.product.name;
      this.cat = this.product.cat;
      this.price = this.product.price;
      this.stock = this.product.stock;
      this.icon = this.product.icon;
      this.desc = this.product.desc;
    }
  }

  get isEdit(): boolean {
    return !!this.product;
  }

  dismiss(): void {
    this.modalCtrl.dismiss();
  }

  save(): void {
    this.errors = {
      name: this.name.trim().length < 2,
      price: !(this.price > 0),
      stock: this.stock < 0,
      desc: this.desc.trim().length < 4,
    };
    if (Object.values(this.errors).some(Boolean)) return;

    const payload = { name: this.name.trim(), cat: this.cat, price: this.price, stock: this.stock, icon: this.icon, desc: this.desc.trim() };
    if (this.product) {
      this.productService.update(this.product.id, payload);
    } else {
      this.productService.add(payload);
    }
    this.modalCtrl.dismiss({ saved: true });
  }

  deleteProduct(): void {
    if (!this.product) return;
    this.productService.remove(this.product.id);
    this.modalCtrl.dismiss({ deleted: true });
  }
}
