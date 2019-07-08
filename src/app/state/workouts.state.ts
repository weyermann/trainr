import { WorkoutService } from './../api-services/workout.service';
import { Workout } from '../model/workout';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

// STATE MODEL
export interface WorkoutCatalogStateModel {
  workouts: Workout[];
}

// ACTIONS
export class AddWorkout {
  static readonly type = '[Workout] Add workout';
  constructor(public payload: Workout) {}
}

export class LoadUserWorkouts {
  static readonly type = '[Workout] Load user workouts';
  constructor(public userID: number) {}
}

@State<WorkoutCatalogStateModel>({
  name: 'workouts',
  defaults: {
    workouts: [
      {
        id: 0,
        workoutName: 'test',
        energySystemID: 23,
        energySubtypeID: 12,
        synopsis: 'test synopsis',
        shortDescription: 'short desc',
        longDescription: 'long desc',
        facilityID: 2,
        facilityOptID: 4,
        duration: 45,
        experienceLevel: 2,
        isPublic: true,
        isActive: true,

        numberOfSets: 4,
        numberOfRepsPerSet: 12,
        loadDurationSeconds: 120,
        restDurationBetweenRepsSeconds: 360,
        restDurationBetweenSetsSeconds: 600
      }
    ]
  }
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
  loadUserWorkouts(
    ctx: StateContext<WorkoutCatalogStateModel>,
    action: LoadUserWorkouts
  ) {
    return this.workoutApiService.getAllUserWorkouts(action.userID).pipe(
      tap((workouts: Workout[]) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          workouts: workouts
        });
      })
    );
  }

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
