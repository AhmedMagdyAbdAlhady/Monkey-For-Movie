import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDataService } from '../../srever/get-data.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-single-movie',
  standalone: false,
  templateUrl: './single-movie.component.html',
  styleUrl: './single-movie.component.css'
})
export class SingleMovieComponent {
  movie : any 
  category:any
 constructor(private activated: ActivatedRoute,
    private getdata: GetDataService,
    private router: Router,
    private spinner: NgxSpinnerService) {
  }
  ngOnInit() {
    this.activated.paramMap.subscribe((params) => {
      
      const id = params.get("id");
      const categoryName = params.get("category");
      this.category =categoryName
      console.log(id)
      if (!id) {
        this.router.navigate(['/']);
        return;
      }
      this.spinner.show()
      this.getdata.getMovieById(categoryName,id).subscribe((res) => {
        console.log(res)
        if (!res) {
          this.router.navigate(['/']);
        } else {
          this.movie = res
        }
      }, (error) => {
        console.error(error)
      }, () => {
        this.spinner.hide();
      });
    });
  }

}
