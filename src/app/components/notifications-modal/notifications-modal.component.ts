import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notifications-modal',
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent],
  templateUrl: './notifications-modal.component.html',
  styleUrl: './notifications-modal.component.scss',
})
export class NotificationsModalComponent {
  private modalCtrl = inject(ModalController);
  notifications = inject(NotificationService);

  constructor() {
    addIcons({ close });
  }

  dismiss(): void {
    this.modalCtrl.dismiss();
  }

  onTap(id: string): void {
    this.notifications.markRead(id);
  }

  markAllRead(): void {
    this.notifications.markAllRead();
  }
}
