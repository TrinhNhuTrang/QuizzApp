import { Injectable } from '@angular/core';
import { QuizHistory } from '../models/quiz-history.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private history: QuizHistory[] = [];

  saveHistory(
    category: string,
    score: number,
    total: number
  ): void {

    const newHistory: QuizHistory = {
      id: Date.now(),
      category: category,
      score: score,
      total: total,
      date: new Date().toISOString()
    };

    this.history.unshift(newHistory);
  }

  getHistory(): QuizHistory[] {
    return this.history;
  }

  clearHistory(): void {
    this.history = [];
  }
}