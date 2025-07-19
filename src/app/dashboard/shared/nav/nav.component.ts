import { Component } from '@angular/core';
import { AuthService } from './../../srever/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
Home: any;
navItems=[
  {
    title:"Trending",
    url:"Trending Movies"
  },
  {
    title:"New Movies",
    url:"New Movies"
  },
  {
    title:"  Animation  ",
    url:"Best Animation Movies"
  },
  {
    title:"Famility",
    url:"Famility-Time"
  }
]
constructor(public authService:AuthService, private router: Router){}
logout(): void {
  this.authService.user = null;
  this.router.navigate(['/login'])
  // this.authService.logout().subscribe(
  //   () => {
  //     this.router.navigate(['/logIn']);
  //     // this.authService.islogIn= true
      
  //     // console.log('✅ تسجيل الخروج بنجاح',this.authService.islogIn);
  //   },
  //   (error) => {
  //     alert(error.message); 
  //   },()=>{
  // console.log(this.authService.isAuthenticated())
  // // console.log(this.authService.user)
  //   }
  // );
}

ngOnInit(){
  if(this.authService.isAuthenticated()){
    this.authService.islogIn= true
  }else{
    this.authService.islogIn= false
  }
}
}
