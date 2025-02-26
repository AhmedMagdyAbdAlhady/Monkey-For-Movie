import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiHomeService {

  apiurl = "/api.json"
  
  constructor(private http: HttpClient) {}
  getMovies(): Observable<any> {
    return this.http.get(this.apiurl)
  }
  getLast10MoviesFromEachCategory(): Observable<any[]> {
    return this.http.get<any[]>(this.apiurl).pipe(
      map(categories => 
        categories.map(category => ({
          title: category.title, 
          movies: category.movies.slice(-12) 
        }))
      )
    );
  }
}
