import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonButton, IonIcon
} from '@ionic/angular';

import { QuizService, CategoryItem, QuestionItem } from '../quiz/quiz.service'; 

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle,
    IonContent, IonCard, IonButton, IonIcon
  ],
})
export class CategoriesPage implements OnInit {
  categories: CategoryItem[] = [];
  
  isModalOpen = false;
  isEditMode = false;
  currentCategory: CategoryItem = this.getEmptyCategory();

  isQuestionModalOpen = false;
  selectedCategoryId = '';
  categoryQuestions: QuestionItem[] = [];
  newQuestion: QuestionItem = this.getEmptyQuestion();

  constructor(private router: Router, private quizService: QuizService) {}

  ngOnInit() {
    this.loadData();
  }

  // Khi quay lại trang sẽ update data mới nhất
  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.categories = this.quizService.getCategories(); 
  }

  selectCategory(category: string) {
    this.router.navigate(['/quiz'], { queryParams: { category } });
  }

  viewHistory() {
    this.router.navigate(['/history']);
  }

  // --- CHỦ ĐỀ ---
  getEmptyCategory(): CategoryItem {
    return { id: '', name: '', icon: '📝', questionsCount: '0 Question' };
  }

  openAddModal() {
    this.isEditMode = false;
    this.currentCategory = { ...this.getEmptyCategory(), id: 'cat_' + Date.now() };
    this.isModalOpen = true;
  }

  openEditModal(cat: CategoryItem, event: Event) {
    event.stopPropagation();
    this.isEditMode = true;
    this.currentCategory = { ...cat };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveCategory() {
    if (!this.currentCategory.name.trim()) {
      alert('Vui lòng nhập tên chủ đề!');
      return;
    }
    
    if (this.isEditMode) {
      this.quizService.updateCategory(this.currentCategory);
    } else {
      this.quizService.addCategory(this.currentCategory);
    }
    
    this.loadData();
    this.closeModal();
  }

  deleteCategory(id: string, event: Event) {
    event.stopPropagation();
    if (confirm('Bạn có chắc chắn muốn xóa chủ đề này?')) {
      this.quizService.deleteCategory(id);
      this.loadData();
    }
  }

  // --- CÂU HỎI ---
  getEmptyQuestion(): QuestionItem {
    return { id: '', categoryId: '', question: '', options: ['', '', '', ''], correctAnswer: 0 };
  }

  openQuestionModal(catId: string, event: Event) {
    event.stopPropagation();
    this.selectedCategoryId = catId;
    this.refreshQuestionList();
    
    this.newQuestion = this.getEmptyQuestion();
    this.newQuestion.categoryId = catId;
    this.isQuestionModalOpen = true;
  }

  closeQuestionModal() {
    this.isQuestionModalOpen = false;
  }

  refreshQuestionList() {
    this.categoryQuestions = this.quizService.getQuestionsByCategory(this.selectedCategoryId);
  }

  addQuestion() {
    if (!this.newQuestion.question.trim() || this.newQuestion.options.some(opt => !opt.trim())) {
      alert('Vui lòng nhập đầy đủ câu hỏi và 4 đáp án!');
      return;
    }
    
    this.newQuestion.id = 'q_' + Date.now();
    this.quizService.addQuestion(this.newQuestion);
    
    this.updateCategoryQuestionCount();
    this.refreshQuestionList();
    
    this.newQuestion = this.getEmptyQuestion();
    this.newQuestion.categoryId = this.selectedCategoryId;
  }

  deleteQuestion(qId: string) {
    if (confirm('Bạn muốn xóa câu hỏi này?')) {
      this.quizService.deleteQuestion(qId);
      this.updateCategoryQuestionCount();
      this.refreshQuestionList();
    }
  }

  updateCategoryQuestionCount() {
    const totalQs = this.quizService.getQuestionsByCategory(this.selectedCategoryId).length;
    const cat = this.categories.find(c => c.id === this.selectedCategoryId);
    
    if (cat) {
      cat.questionsCount = `${totalQs} Question${totalQs !== 1 ? 's' : ''}`;
      this.quizService.updateCategory(cat);
      this.loadData();
    }
  }
}