import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  IonContent,
  IonIcon,
  IonButton
} from '@ionic/angular';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonIcon,
    IonButton
  ],
})
export class ResultPage implements OnInit {
  score = 0;
  total = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.score = Number(params['score']) || 0;
      this.total = Number(params['total']) || 0;
    });
  }

  getMessage(): string {
    if (this.total === 0) {
      return 'Chưa có kết quả.';
    }
    const percentage =
      (this.score / this.total) * 100;
    if (percentage === 100) {
      return 'Xuất sắc! Bạn đã trả lời đúng tất cả câu hỏi.';
    }
    if (percentage >= 80) {
      return 'Rất tốt! Hãy tiếp tục phát huy nhé.';
    }
    if (percentage >= 50) {
      return 'Khá tốt! Bạn có thể cố gắng hơn nữa.';
    }
    return 'Đừng nản lòng! Hãy thử lại nhé.';
  }

  playAgain() {
    this.router.navigate(['/categories']);
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  viewHistory() {
    this.router.navigate(['/history']);
  }
}