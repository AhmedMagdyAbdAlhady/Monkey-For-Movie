import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiHomeService } from '../../../services/api-home.service';

interface Movie {
  backdrop_path: string;
  title: string;
  _id: number;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  movies: any;
  headerSliderType = "Most Trending Shows"
  sliderHeader: Movie[] = [];
  filmCards: Movie[] = []
  categories: any[] = [];
  constructor(private apiService: ApiHomeService,private spinner: NgxSpinnerService) { }
 

  createsliderimage(items: any, type: string) {
    // items.forEach((item: any) => {
      // if (item.key == type) {
      //   this.sliderHeader = item.movies
      // }
    // });
    // change  old database to new data from backend
   for (const property in items) {
    console.log(property)
      if (property == type) {
        this.sliderHeader = items[property]
      }
    
  }
 
  }



  
  ngOnInit() {
    
    this.spinner.show()
    this.apiService.getMovies().subscribe(
      response => {
        this.movies = response;
      },
      error => {
        console.error('Error fetching movies:', error);
      }, () => {
        this.createsliderimage(this.movies, this.headerSliderType);
      }
    );
    this.apiService.getLast10MoviesFromEachCategory().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching movies:', error);
      },()=>{
        this.spinner.hide()
      }
    );
  }
  
}
