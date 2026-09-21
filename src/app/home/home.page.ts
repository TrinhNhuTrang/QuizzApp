import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import {
  IonContent,
  IonIcon,
  IonButton
} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    RouterModule,
    IonContent,
    IonIcon,
    IonButton
  ],
})
export class HomePage {

  constructor(private router: Router) {}

  startQuiz() {
    this.router.navigate(['/categories']);
  }

}