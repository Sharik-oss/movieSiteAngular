import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SingleMovieService {
  url = "http://localhost:1043";

  constructor(private http: HttpClient) {

  }



  getMovieProps(){
    return this.http.get(`${this.url}/movie/13`);
  }
}
