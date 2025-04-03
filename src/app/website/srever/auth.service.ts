import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
   islogIn:boolean =false
  private apiUrl = 'http://localhost:3000/api'; // رابط الـ API
   authTokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('authToken'));
  authToken$ = this.authTokenSubject.asObservable();
  user: any = null; // تخزين بيانات المستخدم

  constructor(private http: HttpClient, private router: Router) {}

  // ✅ تحميل التوكن عند بدء التطبيق
  initializeAuthToken(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.authTokenSubject.next(token);
    }
  }

  // ✅ تسجيل مستخدم جديد
  signup(firstName: string, lastName: string, username: string, email: string, password: string): Observable<any> {
    const userData = { firstName, lastName, username, email, password };
    return this.http.post(`${this.apiUrl}/signup`, userData, { withCredentials: true }).pipe(
      tap((response: any) => {
        this.user=response.user
        if (response.token) {
          this.setAuthToken(response.token);
        }
      }),
      catchError((error) => {
        return throwError(() => new Error(error.error.message || 'فشل في التسجيل'));
      })
    );
  }

  // ✅ تسجيل الدخول
  login(email: any, password: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }, { withCredentials: true }).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setAuthToken(response.token);
          this.user = response.user; // حفظ بيانات المستخدم بعد تسجيل الدخول
        }
      }),
      catchError((error) => {
        return throwError(() => new Error(error.error.message || 'فشل في تسجيل الدخول'));
      })
    );
  }

  // ✅ جلب بيانات المستخدم الحالي
  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`, { withCredentials: true }).pipe(
      tap((response: any) => {
        this.user = response;
      }),
      catchError((error) => {
        return throwError(() => new Error(error.error.message || 'فشل في جلب بيانات المستخدم'));
      })
    );
  }

  // ✅ تسجيل الخروج
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      map((response: any) => {
        this.authTokenSubject.next(null);
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
        this.router.navigate(['/logIn']);
        return response;
      }),
      catchError((error) => {
        console.error('❌ فشل في تسجيل الخروج: السيرفر غير متاح أو لا يعمل', error);
        return throwError(() => new Error('⚠ لا يمكن الاتصال بالخادم، تأكد من تشغيل السيرفر.'));
      })
    );
  }
  

  // ✅ تحديث التوكن
  private setAuthToken(token: string | null): void {
    this.authTokenSubject.next(token);
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  // ✅ حذف التوكن عند تسجيل الخروج
  private clearAuthToken(): void {
    this.authTokenSubject.next(null);
    this.user = null;
    localStorage.removeItem('authToken');
  }

  // ✅ التحقق من حالة تسجيل الدخول
  isAuthenticated(): boolean {
    this.islogIn =true
    return !!this.authTokenSubject.value;
  }
}
