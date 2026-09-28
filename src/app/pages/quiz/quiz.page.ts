import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonProgressBar, IonButton
} from '@ionic/angular';

import { QuizService, QuestionItem } from '../quiz/quiz.service';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle,
    IonContent, IonProgressBar, IonButton
  ],
})
export class QuizPage implements OnInit {
  questions: QuestionItem[] = []; 
  currentQuestionIndex = 0;
  selectedAnswer: number | null = null;
  score = 0;
  category = '';

  constructor(
    private quizService: QuizService,
    private historyService: HistoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'] || 'general';
      this.questions = this.quizService.getQuestionsByCategory(this.category);
    });
  }

  get currentQuestion(): QuestionItem | undefined {
    return this.questions[this.currentQuestionIndex];
  }

  selectAnswer(index: number) {
    if (this.selectedAnswer !== null) {
      return;
    }
    this.selectedAnswer = index;
    
    if (this.currentQuestion && index === this.currentQuestion.correctAnswer) {
      this.score++;
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedAnswer = null;
    } else {
      this.historyService.saveHistory(
        this.category,
        this.score,
        this.questions.length
      );
      this.router.navigate(['/result'], {
        queryParams: {
          score: this.score,
          total: this.questions.length,
          category: this.category
        }
      });
    }
  }
}