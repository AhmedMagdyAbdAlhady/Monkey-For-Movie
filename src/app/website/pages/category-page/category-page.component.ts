import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDataService } from './../../srever/get-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
interface Movie {
  backdrop_path: string;
  title: string;
  _id: number
}
@Component({
  selector: 'app-category-page',
  standalone: false,
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.css'
})
export class CategoryPageComponent {
  sliderHeader: Movie[] = [];
  arrayMovies: any
  title:string | undefined
  constructor(private activated: ActivatedRoute,
    private getdata: GetDataService,
    private router: Router,
    private spinner: NgxSpinnerService) {
  }
  ngOnInit() {
    this.activated.paramMap.subscribe((params) => {
      const categoryName = params.get("categoryName");

      if (!categoryName) {
        this.router.navigate(['/']);
        return;
      }
      this.spinner.show()
      this.getdata.getSpecialCategory(categoryName).subscribe((res) => {
        if (!res || res.length === 0) {
          this.router.navigate(['/']);
        } else {
          this.title =res[0].title
          this.sliderHeader = res[0].movies;
          this.arrayMovies = res[0].movies;
        }
      }, (error) => {
        console.error(error)
      }, () => {
        this.spinner.hide();
      });
    });
  }
}
