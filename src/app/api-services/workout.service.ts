import { APIResponse } from './../shared/interfaces/interfaces';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WorkoutListResponse } from '../model/workout';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private API_HOST = environment.API_URL;

  constructor(private http: HttpClient) { }

  getAllUserWorkouts(userID: number): Observable<WorkoutListResponse> {
    return this.http.get<APIResponse>(this.API_HOST + 'workouts').pipe(
      map(res => {
        return res;
      })
    );
    }
}
