import { WorkoutService } from './../api-services/workout.service';
import { Workout } from '../model/workout';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';

// ACTIONS
export class AddWorkout {
  static readonly type = '[Workout] Add';
  constructor(public payload: Workout) {}
}

export class LoadUserWorkouts {
  static readonly type = '[Workout] Load User Workouts';
  constructor(public userID: number) {}
}

// STATE MODEL
export class WorkoutCatalogStateModel {
  workouts: Workout[];
}

@State<WorkoutCatalogStateModel>({
  name: 'workouts'
})
export class WorkoutCatalogState {
  constructor(private workoutApiService: WorkoutService) {}

  /*
     SELECTORS
    */
  @Selector()
  static getWorkouts(state: WorkoutCatalogStateModel) {
    return state.workouts;
  }

  /*
     REDUCERS
    */

  @Action(LoadUserWorkouts)
  LoadUserWorkouts(
    ctx: StateContext<WorkoutCatalogStateModel>,
    action: LoadUserWorkouts
  ) {
    return this.workoutApiService.getAllUserWorkouts(action.userID).pipe(
      tap((workouts: any) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          workouts: workouts
        });
      })
    );
  }

  // @Action(FeedAnimals)
  // feedAnimals(ctx: StateContext<ZooStateModel>, action: FeedAnimals) {
  //   return this.animalService.feed(action.animalsToFeed).pipe(tap((animalsToFeedResult) => {
  //     const state = ctx.getState();
  //     ctx.setState({
  //       ...state,
  //       feedAnimals: [
  //         ...state.feedAnimals,
  //         animalsToFeedResult,
  //       ]
  //     });
  //   }));
  // }

  @Action(AddWorkout)
  add(
    { getState, patchState }: StateContext<WorkoutCatalogStateModel>,
    { payload }: AddWorkout
  ) {
    const state = getState();
    patchState({
      workouts: [...state.workouts, payload]
    });
  }
}
