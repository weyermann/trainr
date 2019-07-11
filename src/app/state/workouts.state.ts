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
        userID: 1,
        workoutName: 'test',
        energySystemName: 'Power endurance',
        energySubtypeName: 'Anaerobic capacity',
        synopsis: 'test synopsis',
        shortDescription: 'short desc',
        longDescription: 'long desc',
        facilities: [],
        duration: 45,
        experienceLevel: 2,
        public: true,
        active: true,

        defNumberOfSets: 4,
        defNumberOfRepsPerSet: 12,
        defLoadDurationSeconds: 120,
        defRestDurationBetweenRepsSeconds: 360,
        defRestDurationBetweenSetsSeconds: 600
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
  addWorkout(
    { getState, patchState }: StateContext<WorkoutCatalogStateModel>,
    { payload }: AddWorkout
  ) {
    return this.workoutApiService.addUserWorkout(payload).pipe(
      tap((result) => {
        const state = getState();
        patchState({
          workouts: [...state.workouts, result]
        });
      })
    );
  }
}
