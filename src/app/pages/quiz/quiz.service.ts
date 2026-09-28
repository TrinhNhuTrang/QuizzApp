import { Injectable } from '@angular/core';

export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  questionsCount: string;
}

export interface QuestionItem {
  id: string;
  categoryId: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private categories: CategoryItem[] = [
    { id: 'general', name: 'General Knowledge', icon: '🧠', questionsCount: '2 Questions' },
    { id: 'science', name: 'Science', icon: '🔬', questionsCount: '1 Question' }
  ];

  private allQuestions: QuestionItem[] = [
    { id: 'q1', categoryId: 'general', question: 'Thủ đô của Việt Nam là?', options: ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Huế'], correctAnswer: 0 },
    { id: 'q2', categoryId: 'general', question: '1 + 1 bằng mấy?', options: ['1', '2', '3', '4'], correctAnswer: 1 },
    { id: 'q3', categoryId: 'science', question: 'Nước đóng băng ở mấy độ C?', options: ['10', '0', '-5', '100'], correctAnswer: 1 }
  ];

  constructor() {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('quiz_categories', JSON.stringify(this.categories));
    localStorage.setItem('quiz_questions', JSON.stringify(this.allQuestions));
  }

  private loadFromLocalStorage() {
    const savedCategories = localStorage.getItem('quiz_categories');
    const savedQuestions = localStorage.getItem('quiz_questions');
    if (savedCategories) {
      this.categories = JSON.parse(savedCategories);
    }
    if (savedQuestions) {
      this.allQuestions = JSON.parse(savedQuestions);
    }
  }

  // --- CATEGORIES ---
  getCategories(): CategoryItem[] {
    return this.categories;
  }

  addCategory(category: CategoryItem) {
    this.categories.push(category);
    this.saveToLocalStorage();
  }

  updateCategory(category: CategoryItem) {
    const index = this.categories.findIndex(c => c.id === category.id);
    if (index !== -1) {
      this.categories[index] = category;
      this.saveToLocalStorage();
    }
  }

  deleteCategory(categoryId: string) {
    this.categories = this.categories.filter(c => c.id !== categoryId);
    this.allQuestions = this.allQuestions.filter(q => q.categoryId !== categoryId);
    this.saveToLocalStorage();
  }

  // --- QUESTIONS ---
  getQuestionsByCategory(categoryId: string): QuestionItem[] {
    return this.allQuestions.filter(q => q.categoryId === categoryId);
  }

  addQuestion(question: QuestionItem) {
    this.allQuestions.push(question);
    this.saveToLocalStorage();
  }

  deleteQuestion(questionId: string) {
    this.allQuestions = this.allQuestions.filter(q => q.id !== questionId);
    this.saveToLocalStorage();
  }
}