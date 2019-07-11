import { State, Selector, Action, StateContext } from '@ngxs/store';
import { SharedDataService } from '../api-services/shared-data.service';
import { tap } from 'rxjs/operators';
import { ListItem } from '../shared/interfaces/interfaces';


/*
 ACTIONS
*/
export class LoadFacilities {
  static readonly type = '[Shared] LoadFacilityOptions';
  constructor() {}
}

export class LoadEnergySystems {
  static readonly type = '[Shared] LoadEnergySystems';
  constructor() {}
}

/*
 STATE MODEL
*/
export interface SharedStateModel {
  facilities: ListItem[];
  energySystems: ListItem[];
}

@State<SharedStateModel>({
  name: 'shared',
  defaults: {
    facilities: [
      {
        id: 1,
        description: 'Testfacility'
      }
    ],
    energySystems: [
      {
        id: 1,
        description: 'Testenergytype'
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

  @Selector()
  static getEnergySystems(state: SharedStateModel) {
    return state.energySystems;
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

  @Action(LoadEnergySystems)
  loadEnergySystems(ctx: StateContext<SharedStateModel>) {
    return this.sharedService.LoadEnergySystems().pipe(
      tap((res: ListItem[]) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          energySystems: res
        });
      })
    );
  }
}
