import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  apiurl = "/api.json"
  constructor(private http: HttpClient) { }
  getSpecialCategory(categoryName: any): Observable<any> {
    return this.http.get<any[]>(this.apiurl).pipe(
      map(categorys =>
        categorys
          .filter(category=>category.title==categoryName)
          .map(category=>({
            title: category.title,
            movies: category.movies ? category.movies : [] 
          }))
      ))
}
}
