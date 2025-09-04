import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiHomeService {

  apiurl = "https://movies-back-end-eta.vercel.app"

  constructor(private http: HttpClient) { }
  // getMovies(): Observable<any> {
  //   return this.http.get(this.apiurl)
  // }
  // getLast10MoviesFromEachCategory(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiurl).pipe(
  //     map(categories =>
  //       categories.map(category => {
  //         console.log(category)
  //         // return {
  //         //   title: category.collectionName,
  //         //   movies: category.movies.slice(-12)
  //         // }
  //       })
  //     )
  //   );
  // }
getItemsOfMovies(page:any, searchItems?: string):Observable<any>{
  let params = new HttpParams();
    if (searchItems) {
      params = params.append('searchItems', searchItems);
    }
    
    return this.http.get<any[]>(`${this.apiurl}/NumberOFPage=${page}`,{params})
}
 getMovies(): Observable<any> {
  return this.http.get<any[]>(this.apiurl).pipe(
    map(moviesArray => {
      const grouped = moviesArray.reduce((acc, movie) => {
        const key = movie.collectionName || 'Uncategorized';
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(movie);
        return acc;
      }, {} as { [key: string]: any[] });
      return grouped;
    })
  );
}


  getLast10MoviesFromEachCategory(): Observable<any[]> {
  return this.http.get<any[]>(this.apiurl).pipe(
    map(moviesArray => {
      const grouped = moviesArray.reduce((acc, movie) => {
        const key = movie.collectionName || 'Uncategorized';
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(movie);
        return acc;
      }, {} as { [key: string]: any[] });

      // رجع مصفوفة تحتوي على آخر 12 فيلم في كل مجموعة
     return Object.entries(grouped).map(([title, movies]) => {
        const moviesList = movies as any[]; // ✅ الحل هنا
        return {
          title,
          movies: moviesList.slice(-12)
        };
      });
    })
  );
}

}
