export class Workout {
  // id: number;
  userID: number;
  workoutName: string;
  energySystemName: string;
  energySubtypeName: string;
  synopsis: string;
  shortDescription: string;
  longDescription: string;
  facilities: Facility[];
  duration: number;
  experienceLevel: number;
  public: boolean;
  active: boolean;

  defNumberOfSets: number;
  defNumberOfRepsPerSet: number;
  defLoadDurationSeconds: number;
  defRestDurationBetweenRepsSeconds: number;
  defRestDurationBetweenSetsSeconds: number;

  public constructor(init?: Partial<Workout>) {
    Object.assign(this, init);
  }
}

export interface WorkoutListResponse {
  data: Workout[];
}

export interface Facility {
  id: number;
  name: string;
}
