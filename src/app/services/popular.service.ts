import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PopularService {
  private url = 'https://api-movies.github.io/alloha/datasets/';

  constructor(private http: HttpClient) {}


  getPopularMovies(page: String){
    return this.http.get<any>(`${this.url}${page}`);
  }
}
