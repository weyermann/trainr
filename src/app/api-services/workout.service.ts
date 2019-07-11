import { APIResponse } from './../shared/interfaces/interfaces';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WorkoutListResponse, Workout } from '../model/workout';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private API_HOST = environment.API_URL;

  constructor(private http: HttpClient) {}

  

  getAllUserWorkouts(userID: number): Observable<any[]> {
    return this.http.get<any>(this.API_HOST + 'workouts?user=' + userID).pipe(
      map(res => {
        return res;
      })
    );
  }

  addUserWorkout(body: Workout): Observable<any> {
    return this.http.post<any>(this.API_HOST + `workouts`, body).pipe(map(res => {
        return res.data;
      })
    );
  }
}
