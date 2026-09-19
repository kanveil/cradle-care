import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-detail-modal',
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent],
  templateUrl: './order-detail-modal.component.html',
  styleUrl: './order-detail-modal.component.scss',
})
export class OrderDetailModalComponent {
  @Input({ required: true }) order!: Order;

  private modalCtrl = inject(ModalController);
  private orderService = inject(OrderService);

  readonly steps = ['Order placed', 'Processing', 'Shipped', 'Delivered'];
  readonly stepDescriptions = [
    'We received your order and payment.',
    'Your order is being prepared.',
    'Your package is on the way.',
    'Your package has been delivered.',
  ];

  constructor() {
    addIcons({ close });
  }

  get status() {
    return this.orderService.statusInfo(this.order);
  }

  stepState(i: number): 'done' | 'current' | '' {
    const idx = this.status.index;
    if (i < idx) return 'done';
    if (i === idx) return 'current';
    return '';
  }

  stepDescription(i: number): string {
    const idx = this.status.index;
    if (i === idx) return this.stepDescriptions[i];
    return i < idx ? 'Completed' : 'Not reached yet';
  }

  dismiss(): void {
    this.modalCtrl.dismiss();
  }
}
