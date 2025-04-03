import { Component } from '@angular/core';
import { AuthService } from './../../srever/auth.service';

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
constructor(public authService:AuthService){}
logout(): void {
  this.authService.logout().subscribe(
    () => {
      this.authService.islogIn= true
      
      console.log('✅ تسجيل الخروج بنجاح',this.authService.islogIn);
    },
    (error) => {
      alert(error.message); // عرض تنبيه إذا كان السيرفر لا يعمل
    },()=>{
  console.log(this.authService.isAuthenticated())
  console.log(this.authService.user)
    }
  );
}

ngOnInit(){
  if(this.authService.isAuthenticated()){
    this.authService.islogIn= true
  }else{
    this.authService.islogIn= false

  }
  // console.log(this.authService.user)
}
}
