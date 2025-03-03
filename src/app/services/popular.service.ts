import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {IMovies} from '../swiper/helper/interfaces/movies.interface';

@Injectable({
  providedIn: 'root',
})
export class PopularService {
  private url = 'https://backend.ultrafilms.pro/movie';

  constructor(private http: HttpClient) {}


  getPopularMovies(){
    return this.http.get<IMovies[]>(`${this.url}`);
  }
}
