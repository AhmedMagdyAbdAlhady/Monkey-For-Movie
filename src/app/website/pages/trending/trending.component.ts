import { Component } from '@angular/core';
import { ApiHomeService } from '../../../services/api-home.service';
interface Movie {
  backdrop_path: string;
  title: string;
  _id: number
}
@Component({
  selector: 'app-trending',
  standalone: false,
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css'
})
export class TrendingComponent {
  movies: any;
  headerSliderType = "Trending Movies"
  sliderHeader: Movie[] = [];

  constructor(private apiService: ApiHomeService) { }


  createsliderimage(items: any, type: string) {
    items.forEach((item: any) => {
      if (item.title == type) {
        this.sliderHeader = item.movies
      }
    });
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
  }

}
