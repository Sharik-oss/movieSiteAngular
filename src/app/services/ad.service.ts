import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  private url = 'https://backend.ultrafilms.pro/';

  constructor(private http: HttpClient) { }


  getAds() {
    return this.http.get<any>(`${this.url}ad`);
  }
}
