import { Workout } from './../../../../model/workout';
import {
  LoadUserWorkouts
} from './../../../../state/workouts.state';
import { Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-workout-catalog',
  templateUrl: './workout-catalog.component.html',
  styleUrls: ['./workout-catalog.component.scss']
})
export class WorkoutCatalogComponent implements OnInit {
  constructor(private store: Store) {}

  userWorkoutList: Workout[];
  workouts$: Observable<Workout[]>;

  ngOnInit() {
    this.store.dispatch(new LoadUserWorkouts(1)).subscribe(() => {
      console.log('dispatched!');
    });
    // this.workouts$ = this.store.select(state => state.workouts);
    this.store.select(state => state.workouts).subscribe((res) => {
      this.userWorkoutList = res.workouts;
    });
  }
}
