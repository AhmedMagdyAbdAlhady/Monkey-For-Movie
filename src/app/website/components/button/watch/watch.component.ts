import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../srever/auth.service';

@Component({
  selector: 'app-watch',
  standalone: false,
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css'
})
export class WatchComponent {
  constructor(private authService: AuthService) { }
  @Input()id: any;
  OnInit(){
   
  }
  addMovieUser(id:any){
    this.authService.addMovietoUSer(id).subscribe(
      (res)=>console.log(res),
      err=>console.log(err)
    )
    this.authService.getmoviesUser().subscribe(
      ()=>{},
      err=>console.log(err)
    )
  }
}