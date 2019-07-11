import { State, Selector, Action, StateContext } from '@ngxs/store';
import { SharedDataService } from '../api-services/shared-data.service';
import { tap } from 'rxjs/operators';

/*
 HELPERS
*/
export interface ListItem {
  ID: number;
  Description: string;
}

/*
 ACTIONS
*/
export class LoadFacilities {
  static readonly type = '[Shared] LoadFacilityOptions';
  constructor() {}
}

export class LoadEnergyTypes {
  static readonly type = '[Shared] LoadEnergyTypes';
  constructor() {}
}

/*
 STATE MODEL
*/
export interface SharedStateModel {
  facilities: ListItem[];
  energyTypes: ListItem[];
}

@State<SharedStateModel>({
  name: 'shared',
  defaults: {
    facilities: [
      {
        ID: 1,
        Description: 'Testfacility'
      }
    ],
    energyTypes: [
      {
        ID: 1,
        Description: 'Testenergytype'
      }
    ]
  }
})
export class SharedState {
  constructor(private sharedService: SharedDataService) {}

  /*
   SELECTORS
  */
  @Selector()
  static getFacilities(state: SharedStateModel) {
    return state.facilities;
  }

  /*
   REDUCERS
  */
  @Action(LoadFacilities)
  loadFacilities(ctx: StateContext<SharedStateModel>) {
    return this.sharedService.loadFacilities().pipe(
      tap((res: ListItem[]) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          facilities: res
        });
      })
    );
  }
}
