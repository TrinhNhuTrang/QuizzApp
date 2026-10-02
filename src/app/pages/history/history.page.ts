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
  IonButton,
  IonButtons
} from '@ionic/angular';

import { HistoryService } from '../../services/history.service';
import { QuizHistory } from '../../models/quiz-history.model';
import { QuizServices } from '../../services/quiz.service';
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
  IonButton,
  IonButtons
]
})
export class HistoryPage implements OnInit {

  history: QuizHistory[] = [];

  constructor(
    private historyService: HistoryService,
    private router: Router,
    private quizServices: QuizServices
  ) 
  {}
  
  ngOnInit() {
    this.loadHistory();
  }

  ionViewWillEnter() {
    this.loadHistory();
  }

  loadHistory() {
    this.history = this.historyService.getHistory();
  }
  getCategoryName(categoryId: string): string {
  const category = this.quizServices
    .getCategories()
    .find(c => c.id === categoryId);

  return category ? category.name : categoryId;
  }

  clearHistory() {
    this.historyService.clearHistory();
    this.loadHistory();
  }
  

  goToCategories() {
    this.router.navigate(['/categories']);
  }
}