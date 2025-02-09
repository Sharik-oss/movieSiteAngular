import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private url = 'http://localhost:1043/';

  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get<any>(`${this.url}movie`);
  }

}
