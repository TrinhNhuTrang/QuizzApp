import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'categories',
    loadComponent: () => import('./pages/categories/categories.page').then( m => m.CategoriesPage)
  },
  {
    path: 'quiz',
    loadComponent: () => import('./pages/quiz/quiz.page').then( m => m.QuizPage)
  },
  {
    path: 'result',
    loadComponent: () => import('./pages/result/result.page').then( m => m.ResultPage)
  },
  {
  path: 'history',
  loadComponent: () => import('./pages/history/history.page').then(m => m.HistoryPage)
},
];
