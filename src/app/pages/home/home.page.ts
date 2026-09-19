import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonBadge,
  IonInput, IonTextarea, ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  notificationsOutline, cubeOutline, shieldCheckmarkOutline, refreshOutline, leafOutline,
  checkmarkCircle, callOutline, mailOutline, locationOutline,
} from 'ionicons/icons';
import { NotificationService } from '../../services/notification.service';
import { ToastService } from '../../services/toast.service';
import { NotificationsModalComponent } from '../../components/notifications-modal/notifications-modal.component';
import { isValidEmail } from '../../services/validators.util';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent,
    IonBadge, IonInput, IonTextarea,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  private modalCtrl = inject(ModalController);
  private toast = inject(ToastService);
  notifications = inject(NotificationService);

  nlEmail = '';
  nlMsg = '';
  nlOk = true;

  cName = '';
  cEmail = '';
  cMsg = '';
  contactSent = false;
  contactErrors = { name: false, email: false, msg: false };

  constructor() {
    addIcons({
      notificationsOutline, cubeOutline, shieldCheckmarkOutline, refreshOutline, leafOutline,
      checkmarkCircle, callOutline, mailOutline, locationOutline,
    });
  }

  async openNotifications(): Promise<void> {
    const modal = await this.modalCtrl.create({ component: NotificationsModalComponent, breakpoints: [0, 0.7], initialBreakpoint: 0.7 });
    await modal.present();
  }

  submitNewsletter(): void {
    if (!isValidEmail(this.nlEmail)) {
      this.nlOk = false;
      this.nlMsg = 'Please enter a valid email address.';
      return;
    }
    this.nlOk = true;
    this.nlMsg = "You're subscribed — welcome to the list!";
    this.nlEmail = '';
  }

  submitContact(): void {
    this.contactErrors = {
      name: this.cName.trim().length < 2,
      email: !isValidEmail(this.cEmail),
      msg: this.cMsg.trim().length < 5,
    };
    if (Object.values(this.contactErrors).some(Boolean)) { this.contactSent = false; return; }
    this.contactSent = true;
    this.cName = ''; this.cEmail = ''; this.cMsg = '';
    setTimeout(() => (this.contactSent = false), 5000);
  }
}
