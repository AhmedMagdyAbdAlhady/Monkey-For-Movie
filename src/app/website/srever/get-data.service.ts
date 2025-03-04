import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  apiurl = "./api.json"
  constructor(private http: HttpClient) { }
  getSpecialCategory(categoryName: any): Observable<any> {
    return this.http.get<any[]>(this.apiurl).pipe(
      map(categorys =>
        categorys
          .filter(category => category.title == categoryName)
          .map(category => ({
            title: category.title,
            movies: category.movies ? category.movies : []
          }))
      ))
  }
  getMovieById(category: any, id: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiurl).pipe(
      map(categories => {
        let MovieItem: any[] = []
        let relatedMovies: any = []
        for (const categoryMovie of categories) {
          if (categoryMovie.title == category) {
            MovieItem = [...categoryMovie.movies];
          }
          for (const i of MovieItem) {
            if (String(i._id) !== id && relatedMovies.length < 6) {
              relatedMovies.push(i)
            }
          }
          for (const item of categoryMovie.movies) {
            if (item._id == id) {
              return [item, relatedMovies]
            }
          }
        }
        return [];
      })
    );
  }
}
