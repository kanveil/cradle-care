import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonInput, IonTextarea, ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logOutOutline, personCircleOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { NotificationService } from '../../services/notification.service';
import { ToastService } from '../../services/toast.service';
import { formatPhone, isValidEmail, isValidPhone, isValidPostal } from '../../services/validators.util';
import { Order } from '../../models/order.model';
import { OrderDetailModalComponent } from '../../components/order-detail-modal/order-detail-modal.component';

type AuthMode = 'login' | 'signup';
type ProfileTab = 'details' | 'orders';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonInput, IonTextarea],
  templateUrl: './account.page.html',
  styleUrl: './account.page.scss',
})
export class AccountPage {
  auth = inject(AuthService);
  private orderService = inject(OrderService);
  private notifications = inject(NotificationService);
  private toast = inject(ToastService);
  private modalCtrl = inject(ModalController);

  authMode = signal<AuthMode>('login');
  profileTab = signal<ProfileTab>('details');

  // auth form state
  authName = '';
  authEmail = '';
  authPassword = '';
  authError = '';
  authErrors = { name: false, email: false, password: false };
  submitting = false;

  // profile edit state
  profileName = '';
  profilePhone = '';
  profileZip = '';
  profileAddress = '';
  profileBilling = '';
  profileSaved = false;
  profileErrors = { phone: false, zip: false };

  constructor() {
    addIcons({ logOutOutline, personCircleOutline });
    this.syncProfileFields();
  }

  private syncProfileFields(): void {
    const user = this.auth.getStoredUser();
    if (!user) return;
    this.profileName = user.name;
    this.profilePhone = user.phone;
    this.profileZip = user.zip;
    this.profileAddress = user.address;
    this.profileBilling = user.billing;
  }

  setAuthMode(mode: AuthMode): void {
    this.authMode.set(mode);
    this.authError = '';
    this.authErrors = { name: false, email: false, password: false };
  }

  onPhoneInput(ev: CustomEvent): void {
    const value = (ev.detail as any).value ?? '';
    this.profilePhone = formatPhone(value);
  }

  onZipInput(ev: CustomEvent): void {
    const value = (ev.detail as any).value ?? '';
    this.profileZip = value.replace(/\D/g, '').slice(0, 5);
  }

  async submitAuth(): Promise<void> {
    this.authError = '';
    const mode = this.authMode();
    this.authErrors = {
      name: mode === 'signup' && this.authName.trim().length < 2,
      email: !isValidEmail(this.authEmail),
      password: this.authPassword.length < 6,
    };
    if (Object.values(this.authErrors).some(Boolean)) return;

    this.submitting = true;
    const result = mode === 'signup'
      ? await this.auth.signup(this.authName, this.authEmail, this.authPassword)
      : await this.auth.login(this.authEmail, this.authPassword);
    this.submitting = false;

    if (!result.ok) { this.authError = result.message ?? 'Something went wrong.'; return; }

    if (mode === 'signup') this.notifications.add('Account created', 'Your Cradle & Care account is ready.', true);
    this.authName = ''; this.authEmail = ''; this.authPassword = '';
    this.syncProfileFields();
    this.toast.show(mode === 'signup' ? 'Account created' : 'Welcome back');
  }

  logout(): void {
    this.auth.logout();
    this.toast.show('You have been logged out');
  }

  saveProfile(): void {
    const phoneValid = !this.profilePhone || isValidPhone(this.profilePhone);
    const zipValid = !this.profileZip || isValidPostal(this.profileZip);
    this.profileErrors = { phone: !phoneValid, zip: !zipValid };
    if (!phoneValid || !zipValid) {
      this.toast.show(!phoneValid ? 'Please fix the phone number' : 'Please fix the postal code');
      return;
    }
    this.auth.updateProfile({
      name: this.profileName, phone: this.profilePhone, zip: this.profileZip,
      address: this.profileAddress, billing: this.profileBilling,
    });
    this.profileSaved = true;
    setTimeout(() => (this.profileSaved = false), 2500);
  }

  get orders(): Order[] {
    return this.orderService.orders();
  }

  statusLabel(order: Order): string {
    return this.orderService.statusInfo(order).label;
  }

  orderSummary(order: Order): string {
    const names = order.items.slice(0, 2).map((i) => i.name).join(', ');
    return order.items.length > 2 ? `${names}…` : names;
  }

  async viewOrder(order: Order): Promise<void> {
    const modal = await this.modalCtrl.create({ component: OrderDetailModalComponent, componentProps: { order } });
    await modal.present();
  }
}
