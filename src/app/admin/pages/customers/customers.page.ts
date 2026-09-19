import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonSearchbar, ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { exitOutline } from 'ionicons/icons';
import { CustomerService } from '../../../services/customer.service';
import { CustomerDetailModalComponent } from '../../components/customer-detail-modal/customer-detail-modal.component';
import { Customer } from '../../../models/customer.model';

@Component({
  selector: 'app-admin-customers',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonSearchbar],
  templateUrl: './customers.page.html',
  styleUrl: './customers.page.scss',
})
export class CustomersPage {
  customerService = inject(CustomerService);
  private modalCtrl = inject(ModalController);

  query = signal('');

  constructor() {
    addIcons({ exitOutline });
  }

  get results(): Customer[] {
    return this.customerService.search(this.query());
  }

  onSearch(ev: CustomEvent): void {
    this.query.set(((ev.detail as any).value ?? '') as string);
  }

  async openCustomer(customer: Customer): Promise<void> {
    const modal = await this.modalCtrl.create({ component: CustomerDetailModalComponent, componentProps: { customer } });
    await modal.present();
  }
}
