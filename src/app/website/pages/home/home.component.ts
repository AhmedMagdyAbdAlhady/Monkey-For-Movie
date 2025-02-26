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
  headerSliderType = "Movies you can watch for Free"
  sliderHeader: Movie[] = [];
  filmCards: Movie[] = []
  categories: any[] = [];
  constructor(private apiService: ApiHomeService) { }


  createsliderimage(items: any, type: string) {
    items.forEach((item: any) => {
      if (item.title == type) {
        this.sliderHeader = item.movies
      }
    });
  }
  createfilmCards() {

  }
  ngOnInit() {
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
        console.log(data)
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

}
