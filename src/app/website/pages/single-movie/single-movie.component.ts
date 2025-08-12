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
  showMovie: any;
  category:any
movie: any;
id: any;

 constructor(private activated: ActivatedRoute,
    private getdata: GetDataService,
    private router: Router,
    private spinner: NgxSpinnerService) {
  }
  ngOnInit() {
    this.activated.paramMap.subscribe((params) => {
      
       this.id = params.get("id");
      const categoryName = params.get("category");
      this.category =categoryName
      if (!this.id) {
        this.router.navigate(['/']);
        return;
      }
      this.spinner.show()
      this.getdata.getMovieById(this.id).subscribe((res) => {
        if (!res) {
          this.router.navigate(['/not-found']);
        } else {
          this.showMovie = res
        }
      }, (error) => {
        console.error(error)
      }, () => {
        this.spinner.hide();
      });
    });
  }

}
