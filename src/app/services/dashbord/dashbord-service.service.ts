import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DashbordServiceService {
  user: any
  apiurl = environment.apiUrl
  searchOFMovies = [];
  SearchQueryServer: any
  page: number = 1
  constructor(private http: HttpClient) { }
  private searchMoviesSubject = new BehaviorSubject<any>(null);
  searchMovies$ = this.searchMoviesSubject.asObservable();



  // show CurrentPage the change value at now in all component
  private generalCurrentPage = new BehaviorSubject<any>(1);
  general$ = this.generalCurrentPage.asObservable();  // expose as Observable

  // Function to update the value
  setCurrentPage(value: number) {
    this.generalCurrentPage.next(value);
  }



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
    return this.http.get<any[]>(`${this.apiurl}/movies/NumberOFPage=${page}`, { params });
  }
  getMovieById(id: any): Observable<any[]> {
    console.log(`${this.apiurl}/${id}`)
    return this.http.get<any[]>(`${this.apiurl}/movies/${id}`)
  }
  deleteMovie(id: any): Observable<any> {

    return this.http.delete<any[]>(`${this.apiurl}/movies/${id}`);
  }
  updateMovie(id: string, updateData: any) {
    return this.http.put(`${this.apiurl}/movies/${id}`, updateData);
  }
  createMovie(Data: any) {
    return this.http.post(`${this.apiurl}/movies`, Data);
  }
  // movies.service.ts
  getStatsByDate() {
    return this.http.get<{ date: string, count: number }[]>(`${this.apiurl}/movies/stats/by-date`);
  }
  getMovies(): Observable<any> {
    return this.http.get<any[]>(`${this.apiurl}/movies`);
  }
  numberOFVisits(): Observable<any> {
    return this.http.get<any[]>(`${this.apiurl}/visits`);
  }

  addvisite(): Observable<any> {
    return this.http.post(`${this.apiurl}/visits`, {})
  }
  // suer serves///////
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
  getItemsOfUsers(page: number, searchItems?: string): Observable<any> {
    let params = new HttpParams();
    if (searchItems) {
      params = params.set('searchItems', searchItems);
    }
    return this.http.get<any>(`${this.apiurl}/user/NumberOFPage=${page}`, { withCredentials: true, params });
  }
  getUserById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/user/${id}`,{ withCredentials: true})
  }
  deleteUser(id: any): Observable<any> {

    return this.http.delete<any>(`${this.apiurl}/user/${id}`,{ withCredentials: true});
  }
  updateUser(id: string, updateData: any) {
    return this.http.put(`${this.apiurl}/user/${id}`, updateData, { withCredentials: true });
  }
}