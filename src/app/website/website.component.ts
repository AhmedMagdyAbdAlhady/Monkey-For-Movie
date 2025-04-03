import { Component } from '@angular/core';
import { AuthService } from './srever/auth.service';

@Component({
  selector: 'app-website',
  standalone: false,
  templateUrl: './website.component.html',
  styleUrl: './website.component.css'
})
export class WebsiteComponent {
  user: any;
  constructor(private AuthService:AuthService){}
  ngOnInit(){
    // console.log(this.AuthService.isAuthenticated())

    if(this.AuthService.isAuthenticated()){
      // console.log(this.AuthService.isAuthenticated())
      this.AuthService.getUser().subscribe(
        (response) => {
          this.AuthService.user = response;
          if(response){
            this.AuthService.islogIn= true
          }else{
            this.AuthService.islogIn= false
          }
        },
        (error) => {
          console.error('Failed to fetch user data:', error);
  
        }
      );
    }
    
  }
}
