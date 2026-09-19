import { Component, Input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { Customer } from '../../../models/customer.model';
import { OrderService } from '../../../services/order.service';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-customer-detail-modal',
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent],
  templateUrl: './customer-detail-modal.component.html',
  styleUrl: './customer-detail-modal.component.scss',
})
export class CustomerDetailModalComponent {
  @Input({ required: true }) customer!: Customer;

  private modalCtrl = inject(ModalController);
  private orderService = inject(OrderService);
  customerService = inject(CustomerService);

  constructor() {
    addIcons({ close });
  }

  readonly orders = computed(() =>
    this.orderService.orders().filter((o) => o.customerEmail === this.customer.email)
  );

  toggleStatus(): void {
    this.customerService.setStatus(this.customer.id, this.customer.status === 'active' ? 'blocked' : 'active');
    this.customer = { ...this.customer, status: this.customer.status === 'active' ? 'blocked' : 'active' };
  }

  dismiss(): void {
    this.modalCtrl.dismiss();
  }
}
