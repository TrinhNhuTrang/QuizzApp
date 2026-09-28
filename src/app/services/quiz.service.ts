import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private questions: Question[] = [
    {
      id: 1,
      category: 'general',
      question: 'Thủ đô của Việt Nam là gì?',
      options: [
        'Hà Nội',
        'Hồ Chí Minh',
        'Đà Nẵng',
        'Huế'
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      category: 'general',
      question: '2 + 2 bằng bao nhiêu?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1
    },
    {
      id: 3,
      category: 'technology',
      question: 'HTML được sử dụng chủ yếu để làm gì?',
      options: [
        'Tạo cấu trúc trang web',
        'Quản lý cơ sở dữ liệu',
        'Xử lý hình ảnh',
        'Chạy hệ điều hành'
      ],
      correctAnswer: 0
    },
    {
  id: 10,
  category: 'technology',
  question: 'Hybrid App là gì?',
  options: [
    'Ứng dụng chỉ chạy trên máy tính',
    'Ứng dụng chỉ dành cho Android',
    'Ứng dụng chỉ dành cho iOS',
    'Ứng dụng kết hợp công nghệ web và khả năng chạy trên thiết bị di động'
  ],
  correctAnswer: 3
},
{
  id: 11,
  category: 'technology',
  question: 'Công nghệ nào thường được sử dụng để xây dựng Hybrid App?',
  options: [
    'Chỉ sử dụng Java',
    'Chỉ sử dụng C++',
    'HTML, CSS và JavaScript',
    'Chỉ sử dụng SQL'
  ],
  correctAnswer: 2
},
{
  id: 12,
  category: 'technology',
  question: 'Ưu điểm của Hybrid App là gì?',
  options: [
    'Có thể phát triển cho nhiều nền tảng từ một mã nguồn',
    'Chỉ chạy được trên Android',
    'Không cần sử dụng HTML',
    'Không thể truy cập các tính năng của thiết bị'
  ],
  correctAnswer: 0
},
{
  id: 15,
  category: 'technology',
  question: 'Công nghệ nào sau đây có thể được sử dụng để phát triển ứng dụng Hybrid?',
  options: [
    'MySQL và MongoDB',
    'Ionic và Apache Cordova',
    'Photoshop và Illustrator',
    'Excel và PowerPoint'
  ],
  correctAnswer: 1
},
{
      id: 4,
      category: 'science',
      question: 'Hành tinh nào gần Mặt Trời nhất?',
      options: [
        'Trái Đất',
        'Sao Hỏa',
        'Sao Thủy',
        'Sao Kim'
      ],
      correctAnswer: 2
    },
    {
      id: 5,
      category: 'history',
      question: 'Ai là người đọc Tuyên ngôn Độc lập ngày 2/9/1945?',
      options: [
        'Võ Nguyên Giáp',
        'Hồ Chí Minh',
        'Trường Chinh',
        'Phạm Văn Đồng'
      ],
      correctAnswer: 1
    }
  ];

  getQuestionsByCategory(category: string): Question[] {
    return this.questions.filter(
      question => question.category === category
    );
  }

  
}



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
export class QuizServices {
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