import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonButton
} from '@ionic/angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonButton
  ],
})
export class CategoriesPage {

  constructor(private router: Router) {}

  selectCategory(category: string) {
    this.router.navigate(['/quiz'], {
      queryParams: { category }
    });
  }

  viewHistory() {
    this.router.navigate(['/history']);
  }

}