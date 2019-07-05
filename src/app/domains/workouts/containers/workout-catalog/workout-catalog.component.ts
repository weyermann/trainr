import { Workout } from './../../../../model/workout';
import { WorkoutCatalogState, LoadUserWorkouts } from './../../../../state/workouts.state';
import { Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-workout-catalog',
  templateUrl: './workout-catalog.component.html',
  styleUrls: ['./workout-catalog.component.scss']
})
export class WorkoutCatalogComponent implements OnInit {

  constructor(private store: Store) { }

  workouts: any[];
  workouts$: Observable<Workout[]>;

  ngOnInit() {
    this.store.dispatch(new LoadUserWorkouts(1));
    this.workouts$ = this.store.select(state => state.workouts);
  }

}
