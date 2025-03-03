import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SingleMovieService {
  url = "https://backend.ultrafilms.pro";

  constructor(private http: HttpClient) {

  }



  getMovieProps(movieId: any){
    return this.http.get(`${this.url}/movie/${movieId}`);
  }
}
