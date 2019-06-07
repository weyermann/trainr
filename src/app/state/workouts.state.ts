import { Workout } from '../model/workout';
import { State, Selector, Action, StateContext } from '@ngxs/store';


// ACTIONS
export class AddWorkout {
    static readonly type = '[Workout] Add';

    constructor(public payload: Workout) {}
}

// -----------------------------------------------------------------------------------------

// STATE MODEL
export class WorkoutCatalogStateModel {
  workouts: Workout[];
}

@State<WorkoutCatalogStateModel>({
  name: 'workouts',
  defaults: {
    workouts: []
  }
})
export class WorkoutCatalogState {

  @Selector()
  static getWorkouts(state: WorkoutCatalogStateModel) {
      return state.workouts;
  }

  @Action(AddWorkout)
  add({getState, patchState }: StateContext<WorkoutCatalogStateModel>, { payload }: AddWorkout) {
      const state = getState();
      patchState({
          workouts: [...state.workouts, payload]
      });
  }
}
