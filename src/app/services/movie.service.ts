import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private url = 'https://api-movies.github.io/alloha/datasets/';

  constructor(private http: HttpClient) {}

  getMovies(page: Text) {
    return this.http.get<any>(`${this.url}${page}`);
  }


  getMovie() {

    return this.http.get('https://sansa.allarknow.online/movie/988601', {});
  }
}
