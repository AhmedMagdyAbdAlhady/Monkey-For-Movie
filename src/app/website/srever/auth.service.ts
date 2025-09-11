import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  islogIn: boolean = false;
  private apiUrl =environment.apiUrl;
  auth_tokenSubject = new BehaviorSubject<string | null>(this.getCookie('auth_token'));
  auth_token$ = this.auth_tokenSubject.asObservable();
  user: any = null;

  constructor(private http: HttpClient, private router: Router) { }

  // ✅ دوال التعامل مع الكوكيز
  private setCookie(name: string, value: string, days: number): void {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
  }

  private getCookie(name: string): string | null {
    const cookie = document.cookie.split('; ').find(item => item.startsWith(`${name}=`));
    return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
  }

  private deleteCookie(name: string): void {
    this.setCookie(name, '', -1);
  }

  // ✅ تحميل التوكن عند بدء التطبيق من الكوكيز
  initializeauth_token(): void {
    const token = this.getCookie('auth_token');
    if (token) {
      this.auth_tokenSubject.next(token);
    }
  }

  // ✅ تسجيل مستخدم جديد
  // signup(firstName: any, lastName: any, username: any, email: any, password: any): Observable<any> {
  //   const userData = { firstName, lastName, username, email, password };
  // return this.http.post(`${this.apiUrl}/signup`, userData, { withCredentials: true }).pipe(
  //   tap((response: any) => {
  //     this.user = response.user;
  //   }),
  //   catchError((error) => {
  //     return throwError(() => new Error(error.error.message || 'فشل في التسجيل'));
  //   })
  // );
  // }
  signup(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/add`, formData, { withCredentials: true }).pipe(
      tap((response: any) => {
        this.user = response.userDetails;
      }),
      catchError((error) => {
        return throwError(() => new Error(error.error.message || 'فشل في التسجيل'));
      })
    );;
  }
  
  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/profile`, { withCredentials: true });
  }
  editUser(formData: any,id:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/user/${id}`, formData, { withCredentials: true }).pipe(
      tap((response: any) => {
        this.user = response.userDetails;
      }),
      catchError((error) => {
        return throwError(() => new Error(error.error.message || 'فشل في التسجيل'));
      })
    );;
    }
  // ✅ تسجيل الدخول
  login(email: any, password: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/login`, { email, password }, { withCredentials: true }).pipe(
      tap((response: any) => {
        if (response.userDetails) {
          // this.setauth_token(response.token);
          this.user = response.userDetails;
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
        return throwError(() => new Error(error.error.message || 'same thing error'));
      })
    );
  }
addMovietoUSer(id:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/watch/${this.user._id}/${id}`,{}, { withCredentials: true });
  
}
getmoviesUser(): Observable<any>{
  return this.http.get<any>(`${this.apiUrl}/user/${this.user._id}/movies`, { withCredentials: true });
}
deletemoviesUser(id:any): Observable<any>{
  return this.http.delete<any>(`${this.apiUrl}/user/unwatch/${this.user._id}/${id}`, { withCredentials: true });
}
  // ✅ تسجيل الخروج
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/logout`, {}, { withCredentials: true }).pipe(
      map((response: any) => {
        this.auth_tokenSubject.next(null);
        this.deleteCookie('auth_token');
        this.router.navigate(['/logIn']);
        return response;
      }),
      catchError((error) => {
        console.error('❌ فشل في تسجيل الخروج: السيرفر غير متاح أو لا يعمل', error);
        return throwError(() => new Error('⚠ لا يمكن الاتصال بالخادم، تأكد من تشغيل السيرفر.'));
      })
    );
  }

  // ✅ تحديث التوكن في الكوكيز
  private setauth_token(token: string | null): void {
    this.auth_tokenSubject.next(token);
    if (token) {
      this.setCookie('auth_token', token, 7); // صلاحية 7 أيام
    } else {
      this.deleteCookie('auth_token');
    }
  }

  // ✅ حذف التوكن عند تسجيل الخروج
  private clearauth_token(): void {
    this.auth_tokenSubject.next(null);
    this.user = null;
    this.deleteCookie('auth_token');
  }

  // ✅ التحقق من حالة تسجيل الدخول
  isAuthenticated(): boolean {
    this.islogIn = true;
    return !!this.auth_tokenSubject.value;
  }
}
