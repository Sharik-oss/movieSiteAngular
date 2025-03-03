import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private url = 'https://backend.ultrafilms.pro/'

  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get<any>(`${this.url}movie`);
  }

}
