import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  statsChartOutline, peopleOutline, pricetagsOutline, receiptOutline, cubeOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-admin-tabs',
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
  templateUrl: './admin-tabs.page.html',
  styleUrl: './admin-tabs.page.scss',
})
export class AdminTabsPage {
  constructor() {
    addIcons({ statsChartOutline, peopleOutline, pricetagsOutline, receiptOutline, cubeOutline });
  }
}
