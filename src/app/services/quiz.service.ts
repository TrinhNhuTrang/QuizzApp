import { Injectable } from '@angular/core';

export interface CategoryItem {
  id: string;
  name: string;
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
export class QuizServices {
  private categories: CategoryItem[] = [
    {
      id: 'general',
      name: 'Kiến thức chung',
      questionsCount: '2 Câu'
    },
    {
      id: 'science',
      name: 'Khoa học',
      questionsCount: '1 Câu'
    },
    {
    id: 'technology',
    name: 'Hybrid App',
    questionsCount: '5 Câu'
    }
  ];

  private allQuestions: QuestionItem[] = [
    { id: 'q1', categoryId: 'general', question: 'Thủ đô của Việt Nam là?', options: ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Huế'], correctAnswer: 0 },
    { id: 'q2', categoryId: 'general', question: '1 + 1 = ?', options: ['10', '2', '3', '1'], correctAnswer: 0 },
    { id: 'q3', categoryId: 'science', question: 'Nước đóng băng ở mấy độ C?', options: ['10', '0', '-5', '100'], correctAnswer: 1 },
    { id: 'q4', categoryId: 'technology', question: 'Hybrid App là gì?',options: ['Ứng dụng web chỉ chạy trên trình duyệt','Ứng dụng native dành cho đa nền tảng','Ứng dụng kết hợp công nghệ web với khả năng chạy trên thiết bị di động','Ứng dụng web không thể truy cập tính năng thiết bị' ],correctAnswer: 2},
    { id: 'q5', categoryId: 'technology', question: 'Công nghệ nào thường được sử dụng để xây dựng Hybrid App?', options: [ 'HTML, CSS và JavaScript','Java, XML và SQL','C++ và Python','HTML, Java và SQL'], correctAnswer: 0 },
    { id: 'q6', categoryId: 'technology', question: 'Công nghệ nào sau đây có thể được sử dụng để phát triển ứng dụng Hybrid?', options: ['React và MySQL','Ionic và Apache Cordova','Photoshop và Illustrator','Excel và PowerPoint'], correctAnswer: 1 },
    { id: 'q7', categoryId: 'technology', question: 'Đâu là mô tả chính xác nhất về WebView trong kiến trúc Hybrid App?', options: ['Một View dùng để hiển thị Web App và thực thi mã web','Một View dùng để hiển thị Native App và xử lý Native API','Một View dùng để kết nối trực tiếp giao diện web với phần cứng','Một View chỉ dùng để hiển thị HTML, không thực thi JavaScript' ],correctAnswer: 0},
    { id: 'q8', categoryId: 'technology', question: 'Kiến trúc Hybrid App trong bài được mô tả gồm bao nhiêu lớp chính?', options: ['2 lớp', '3 lớp', '4 lớp', '5 lớp'], correctAnswer: 2 }
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