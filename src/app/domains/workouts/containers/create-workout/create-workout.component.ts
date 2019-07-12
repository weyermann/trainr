import { Workout } from './../../../../model/workout';
import { AddWorkout } from './../../../../state/workouts.state';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { Store } from '@ngxs/store';
import { SharedState } from 'src/app/state/shared.state';
import { ListItem } from 'src/app/shared/interfaces/interfaces';
import { map } from 'rxjs/operators';

// const energySystemOptions = [
//   {
//     value: 'strength_power',
//     label: 'Strength / Power',
//     isLeaf: true
//   },
//   {
//     value: 'power_endurance',
//     label: 'Power Endurance',
//     children: [
//       {
//         value: 'aerobic_power',
//         label: 'Aerobic Power',
//         isLeaf: true
//       },
//       {
//         value: 'anaerobic_capacity',
//         label: 'Anaerobic Capacity',
//         isLeaf: true
//       }
//     ]
//   }
// ];

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.scss']
})
export class CreateWorkoutComponent implements OnInit {

  values: any[] | null = null;

  // Observable lists
  energySystemOptions$: Observable<ListItem[]>;
  locationOptions$: Observable<ListItem[]>;
  experienceLevelOptions$: Observable<ListItem[]>;

  // Lookup values
  experienceOptions: string[];
  locationOptions: ListItem[] = [];

  workoutForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private store: Store) {

    this.workoutForm = this.fb.group({
      workoutName: ['', Validators.required],
      energySystem: ['', Validators.required],
      synopsis: ['', Validators.required],
      shortDescription: ['', Validators.required],
      longDescription: [''],
      facilities: [Validators.required],
      duration: [30, Validators.required],
      experienceLevel: [],

      defNumberOfSets: [3],
      defNumberOfRepsPerSet: [10],
      defLoadDurationSeconds: [5],
      defRestDurationBetweenRepsSeconds: [120],
      defRestDurationBetweenSetsSeconds: [300],
    });
  }

  ngOnInit() {
    this.locationOptions$ = this.store.select(SharedState.getFacilities);
    this.energySystemOptions$ = this.store.select(SharedState.getEnergySystems);
    this.experienceLevelOptions$ = this.store.select(SharedState.getExperienceLevels);

    // We need a static object for payload mapping
    this.locationOptions$
      .pipe(
        map(l => {
          this.locationOptions = l;
          console.log('Location options:', l);
        })
      ).subscribe();

  }

  submitForm(formvalue: any): void {
    // tslint:disable-next-line:forin
    for (const key in this.workoutForm.controls) {
      this.workoutForm.controls[key].markAsDirty();
      this.workoutForm.controls[key].updateValueAndValidity();
    }
    console.log(formvalue);

    // expand the facilities array of numbers to array of objects
    const facilityObjects = [];
    for (let f = 1; f < formvalue.facilities.length; f++) {
      const facilityName = this.locationOptions.find(x => x.id === formvalue.facilities[f]).description;
      console.log('Facility name', facilityName);
      facilityObjects.push({
        id: formvalue.facilities[f],
        description: facilityName
      });
    }
    formvalue.facilities = facilityObjects;


    // Send to API
    const workoutPost = new Workout(formvalue);

    // const fakeWorkout: Workout = {
    //   'workoutName': 'Fake Insert Test 3',
    //   'energySystemName': 'Strength and Power',
    //   'energySubtypeName': 'Bouldering',
    //   'synopsis': 'Hard problems using a training board',
    //   'shortDescription': 'Executing 10 different boulder problems at two difficulty levels on a bouldering wall or training board.',
    //   'longDescription': 'This is going to become the very long description',
    //   'facilities': [{'id': 7, 'name': 'Custom facility 1'}, {'id': 8, 'name': 'Custom facility 2'}],
    //   'duration': 40,
    //   'active': true,
    //   'public': true,
    //   'experienceLevel': 1,
    //   'defNumberOfSets': 10,
    //   'defNumberOfRepsPerSet': 10,
    //   'defLoadDurationSeconds': 240,
    //   'defRestDurationBetweenRepsSeconds': 60,
    //   'defRestDurationBetweenSetsSeconds': 180,
    //   'userID': 1
    // };

//     approxDuration: 30
// defaultLoadDurationSeconds: 5
// defaultNumberOfRepsPerSet: 10
// defaultNumberOfSets: 3
// defaultRestDurationBetweenRepsSeconds: 120
// defaultRestDurationBetweenSetsSeconds: 300
// energySystem: 1
// experienceLevel: 2
// facility: Array(3)
// 0: ""
// 1: 1
// 2: 4
// length: 3
// __proto__: Array(0)
// longDescription: "fasdf"
// shortDescription: "asdfas"
// synopsis: "one csesdf"
// userID: 1
// workoutName: "boulder xsx"

    // TODO add userID property
    workoutPost.userID = 1;
    workoutPost.active = true;
    workoutPost.public = false;

    // expand the facilities array of numbers to array of objects
    // const facilityObjects = [];
    // for (let f = 1; f < workoutPost.facilities.length; f++) {
    //   const facilityName = this.locationOptions.find(x => x.id === workoutPost.facilities[f].id).description;
    //   console.log('Facility name', facilityName);
    //   facilityObjects.push({
    //     id: f,
    //     description: facilityName
    //   });
    // }
    // workoutPost.facilities = facilityObjects;

    if (this.workoutForm.valid) {
      this.store.dispatch(new AddWorkout(workoutPost));
    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    console.log('Form before reset: ');
    console.log(this.workoutForm.value);
    this.workoutForm.reset();
    // tslint:disable-next-line:forin
    for (const key in this.workoutForm.controls) {
      this.workoutForm.controls[key].markAsPristine();
      this.workoutForm.controls[key].updateValueAndValidity();
    }
  }

  onChanges(values: any): void {
    console.log(values, this.values);
  }

}
