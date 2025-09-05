import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DashbordServiceService {
  user:any
  apiurl =environment.apiUrl
  searchOFMovies = [];
  SearchQueryServer: any
  page: number = 1
  constructor(private http: HttpClient) { }
  private searchMoviesSubject = new BehaviorSubject<any>(null);
  searchMovies$ = this.searchMoviesSubject.asObservable();

  setSearchMovies(data: any) {
    this.searchMoviesSubject.next(data);
  }

  getSearchMovies() {
    return this.searchMoviesSubject.getValue();
  }
  private searchQuerySubject = new BehaviorSubject<string | null>(null);
  searchQuery$ = this.searchQuerySubject.asObservable();

  setSearchQuery(query: string | null) {
    this.searchQuerySubject.next(query);
  }

  getSearchQuery() {
    return this.searchQuerySubject.getValue();
  }



  getItemsOfMovies(page: number, searchItems?: string): Observable<any> {
    let params = new HttpParams();
    if (searchItems) {
      params = params.set('searchItems', searchItems);
    }
    return this.http.get<any[]>(`${this.apiurl}/NumberOFPage=${page}`, { params });
  }
  getMovieById(id: any): Observable<any[]> {
    console.log(`${this.apiurl}/${id}`)
    return this.http.get<any[]>(`${this.apiurl}/${id}`)
  }
  deleteMovie(id: any): Observable<any> {

    return this.http.delete<any[]>(`${this.apiurl}/${id}`);
  }
  updateMovie(id: string, updateData: any) {
    return this.http.put(`${this.apiurl}/${id}`, updateData);
  }
  createMovie(Data: any) {
    return this.http.post(`${this.apiurl}`, Data);
  }
  // movies.service.ts
  getStatsByDate() {
    return this.http.get<{ date: string, count: number }[]>(`${this.apiurl}/stats/by-date`);
  }
   getMovies(): Observable<any> {
  return this.http.get<any[]>(this.apiurl);}
numberOFVisits():Observable<any>{
return this.http.get<any[]>(`${this.apiurl}/visits`);}

 addvisite(): Observable<any> {
  console.log(1)
     return this.http.post(`${this.apiurl}/visits`,{})
  }
  // ✅ جلب بيانات المستخدم الحالي
  getUser(): Observable<any> {
    return this.http.get(`${this.apiurl}/user`, { withCredentials: true }).pipe(
      tap((response: any) => {
        this.user = response;
      }),
      catchError((error) => {
        return throwError(() => new Error(error.error.message || 'same thing error'));
      })
    );
  }
}