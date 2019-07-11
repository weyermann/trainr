import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private API_HOST = environment.API_URL;

  constructor(private http: HttpClient) { }

  loadFacilities(): Observable<any[]> {
    return this.http.get<any>(this.API_HOST + `list/facilities`).pipe(
      map(res => {
        return res;
      })
    );
  }

  LoadEnergySystems(): Observable<any[]> {
    return this.http.get<any>(this.API_HOST + `list/energysystems`).pipe(
      map(res => {
        return res;
      })
    );
  }
}
