import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  apiurl = "http://localhost:3000/"
  constructor(private http: HttpClient) { }
  getSpecialCategory(categoryName: any): Observable<any> {
    return this.http.get<any[]>(this.apiurl).pipe(

      map(categorys => {
       const grouped = categorys.reduce((acc, movie) => {
        const key = movie.collectionName || 'Uncategorized';
        if (!acc[key]) {
          acc[key] = [];
        }
          acc[key].push(movie);
        return acc;
      }, {} as { [key: string]: any[] });
      return grouped[categoryName];
      }))
  }
  getMovieById(id: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiurl}${id}`).pipe(
      map(categories => {
        console.log(categories)
        return categories
  })
    );
  }
}
