import { Component, OnInit } from '@angular/core';
import { AuthService } from './srever/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-website',
  standalone: false,
  templateUrl: './website.component.html',
  styleUrl: './website.component.css'
})
export class WebsiteComponent implements OnInit {

  constructor(private authService: AuthService,private router: Router) {}
    isDashboardRoute(): boolean {
    return this.router.url.startsWith('/dashboard');
  }
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
