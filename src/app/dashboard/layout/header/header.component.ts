import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from './../../../website/srever/auth.service';
import { Router } from '@angular/router';
import { DashbordServiceService } from '../../../services/dashbord/dashbord-service.service';
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchQuery: string = '';
  @Output() search = new EventEmitter<string>();
  Home: any;
  navItems = [
    {
      title: "Trending",
      url: "Trending Movies"
    },
    {
      title: "New Movies",
      url: "New Movies"
    },
    {
      title: "  Animation  ",
      url: "Best Animation Movies"
    },
    {
      title: "Famility",
      url: "Famility-Time"
    }
  ]
  constructor(public authService: AuthService, private router: Router, private service: DashbordServiceService) { }
  // logout(): void {
  //   this.authService.user = null;
  //   this.router.navigate(['/login'])
  //   // this.authService.logout().subscribe(
  //   //   () => {
  //   //     this.router.navigate(['/logIn']);
  //   //     // this.authService.islogIn= true

  //   //     // console.log('✅ تسجيل الخروج بنجاح',this.authService.islogIn);
  //   //   },
  //   //   (error) => {
  //   //     alert(error.message); 
  //   //   },()=>{
  //   // console.log(this.authService.isAuthenticated())
  //   // // console.log(this.authService.user)
  //   //   }
  //   // );
  // }

  ngOnInit() {
    // if (this.authService.isAuthenticated()) {
    //   this.authService.islogIn = true
    // } else {
    //   this.authService.islogIn = false
    // }
  }

  onSearch(): void {
    this.service.setSearchQuery(this.searchQuery); // ← خزّن الكلمة
    this.service.getItemsOfMovies(1, this.searchQuery).subscribe(
      (res) => {
        this.service.setSearchMovies(res.Movies);
        this.router.navigate(["dashboard"])
      },
      (err) => {
        console.error('Search error:', err);
      }
    );
  }
  logout(): void {
  this.authService.user = "";
  this.router.navigate(['/logIn'])
  this.authService.logout().subscribe(
    (res) => {

      // this.authService.islogIn= true
      // console.log('✅ تسجيل الخروج بنجاح',this.authService.islogIn);
    },
    (error) => {
      console.log(error.message); 
    },()=>{
  console.log(this.authService.isAuthenticated())
  // console.log(this.authService.user)
    }
  );
}


}
