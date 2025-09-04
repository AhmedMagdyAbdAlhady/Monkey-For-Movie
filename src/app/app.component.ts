import { Component, OnInit } from '@angular/core';
import { AuthService } from './website/srever/auth.service';
import { DashbordServiceService } from './services/dashbord/dashbord-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // ✅ تحميل التوكن من الكوكيز
    this.authService.initializeauth_token();

    // ✅ جلب بيانات المستخدم لو مسجّل دخول
    if (this.authService.isAuthenticated()) {
      this.authService.getUser().subscribe({
        next: (user) => {
          console.log('🟢 مرحبًا يا', user?.username || 'مستخدم');
        },
        error: (err) => {
          console.warn('⚠ فشل في جلب بيانات المستخدم:', err.message);
        }
      });
    }
  }
}
