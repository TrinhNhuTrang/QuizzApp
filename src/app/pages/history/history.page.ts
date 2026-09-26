import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton
} from '@ionic/angular';

import { HistoryService } from '../../services/history.service';
import { QuizHistory } from '../../models/quiz-history.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton
  ]
})
export class HistoryPage implements OnInit {

  history: QuizHistory[] = [];

  constructor(
    private historyService: HistoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadHistory();
  }

  ionViewWillEnter() {
    this.loadHistory();
  }

  loadHistory() {
    this.history = this.historyService.getHistory();
  }

  clearHistory() {
    this.historyService.clearHistory();
    this.loadHistory();
  }

  goToCategories() {
    this.router.navigate(['/categories']);
  }
}