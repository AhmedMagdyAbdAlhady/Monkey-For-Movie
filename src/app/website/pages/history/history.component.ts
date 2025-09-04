import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../srever/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-history',
  standalone: false,
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  items:any;
  constructor(private server: AuthService, private toastr:ToastrService){
   
  }
  ngOnInit(){
    this.server.getUser().subscribe({
      next: () => {
        if(this.server.user){
          this.server.getmoviesUser().subscribe(
            (res)=> {
              this.items = res.movies
            },
            (err)=>console.log(err)
          )
        }

      },
      error: (err) => {
        console.log(err)

      }
    });
    
  }
  deleteItem(id:any){
    this.server.deletemoviesUser(id).subscribe(
      (res)=>{
        this.toastr.success(res.message)
        //to show movies in the table
        this.server.getmoviesUser().subscribe(
          (response)=> {
            this.items = response.movies
          },
          (error)=>console.log(error)
        )
      },
      err=>this.toastr.warning(err.message)
    )
  }
}
