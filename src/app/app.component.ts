import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'websiteMovies';
  constructor(private spinner: NgxSpinnerService){}
}
  // HTTP Interceptor (separate file)
  export class SpinnerInterceptor implements HttpInterceptor {
    constructor(private spinner: NgxSpinnerService) { }
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.spinner.show(); // Show spinner on HTTP request
      return next.handle(req).pipe(
        finalize(() => this.spinner.hide()) // Hide spinner when the request completes
      );
    }
  }