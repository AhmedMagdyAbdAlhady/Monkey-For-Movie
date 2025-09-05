import { Component, OnInit } from '@angular/core';
import { AuthService } from './srever/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { DashbordServiceService } from '../services/dashbord/dashbord-service.service';
import { filter } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-website',
  standalone: false,
  templateUrl: './website.component.html',
  styleUrl: './website.component.css'
})
export class WebsiteComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private visite: DashbordServiceService, private toastr: ToastrService) { }
  isDashboardRoute(): boolean {
    return this.router.url.startsWith('/dashboard');
  }

  ngOnInit(): void {
    // ⬅️ Register the visit upon first loading (refresh)
    const firstSegment = this.router.url.split('/')[1];
    if (firstSegment !== 'dashboard') {
      this.visite.addvisite()
    }
    // ⬅️ Record the visit when moving inside Angular
    // this.router.events
    //   .pipe(filter((event: any) => event instanceof NavigationEnd))
    //   .subscribe((event: any) => {
    //     console.log("firstSegment")

    //     const firstSegment = event.urlAfterRedirects.split('/')[1];
    //     if (firstSegment !== 'dashboard') {
    //       this.visite.addvisite().subscribe((res) => {
    //         console.log(res)
    //       }, (err) => {
    //         console.log(err)
    //       })
    //     }
    //   });



    // ✅ تحميل التوكن من الكوكيز
    // this.authService.initializeauth_token();

    // ✅ جلب بيانات المستخدم لو مسجّل دخول
    this.authService.getUser().subscribe({
      next: (res) => {
        this.toastr.success(`hallo ${res.userName}`);
      },
      error: (err) => {
         this.toastr.warning( err);
      }
    });
  }
}

