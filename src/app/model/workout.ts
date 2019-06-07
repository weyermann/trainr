export interface Workout {
  id: number;
  workoutName: string;
  energySystemID: number;
  energySubtypeID: number;
  synopsis: string;
  shortDescription: string;
  longDescription: string;
  facilityID: number;
  facilityOptID: number;
  duration: number;
  experienceLevel: number;
  isPublic: boolean;
  isActive: boolean;

  numberOfSets: number;
  numberOfRepsPerSet: number;
  loadDurationSeconds: number;
  restDurationBetweenRepsSeconds: number;
  restDurationBetweenSetsSeconds: number;
}

export interface WorkoutListResponse {
  data: Workout[];
}
