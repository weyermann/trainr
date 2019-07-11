import { Workout } from './../../../../model/workout';
import { AddWorkout } from './../../../../state/workouts.state';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { Store } from '@ngxs/store';

const energySystemOptions = [
  {
    value: 'strength_power',
    label: 'Strength / Power',
    isLeaf: true
  },
  {
    value: 'power_endurance',
    label: 'Power Endurance',
    children: [
      {
        value: 'aerobic_power',
        label: 'Aerobic Power',
        isLeaf: true
      },
      {
        value: 'anaerobic_capacity',
        label: 'Anaerobic Capacity',
        isLeaf: true
      }
    ]
  }
];

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.scss']
})
export class CreateWorkoutComponent implements OnInit {

  nzOptions = energySystemOptions;
  values: any[] | null = null;

  locationOptions: string[];
  experienceOptions: string[];

  workoutForm: FormGroup;
  energySystemOptions: any; // TODO load from api, put in store

  constructor(
    private fb: FormBuilder,
    private store: Store) {

    this.workoutForm = this.fb.group({
      workoutName: ['', Validators.required],
      energySystem: ['', Validators.required],
      synopsis: ['', Validators.required],
      shortDescription: ['', Validators.required],
      longDescription: [''],
      facility: ['', Validators.required],
      approxDuration: [30, Validators.required],
      experienceLevel: [''],

      defaultNumberOfSets: [3],
      defaultNumberOfRepsPerSet: [10],
      defaultLoadDurationSeconds: [5],
      defaultRestDurationBetweenRepsSeconds: [120],
      defaultRestDurationBetweenSetsSeconds: [300],
    });
  }

  ngOnInit() {
    this.locationOptions = ['Climbing gym', 'Bouldering gym', 'Home wall', 'Fitness club', 'Crag', 'Outdoor boulder area'];
    this.experienceOptions = ['Beginner', 'Advanced', 'Expert'];
  }

  submitForm(formvalue: any): void {
    // tslint:disable-next-line:forin
    for (const key in this.workoutForm.controls) {
      this.workoutForm.controls[key].markAsDirty();
      this.workoutForm.controls[key].updateValueAndValidity();
    }
    console.log(formvalue);

    // Send to API
    const workoutPost = new Workout(formvalue);

    const fakeWorkout: Workout = {
      'workoutName': 'Fake Insert Test 3',
      'energySystemName': 'Strength and Power',
      'energySubtypeName': 'Bouldering',
      'synopsis': 'Hard problems using a training board',
      'shortDescription': 'Executing 10 different boulder problems at two difficulty levels on a bouldering wall or training board.',
      'longDescription': 'This is going to become the very long description',
      'facilities': [{'id': 7, 'name': 'Custom facility 1'}, {'id': 8, 'name': 'Custom facility 2'}],
      'duration': 40,
      'active': true,
      'public': true,
      'experienceLevel': 1,
      'defNumberOfSets': 10,
      'defNumberOfRepsPerSet': 10,
      'defLoadDurationSeconds': 240,
      'defRestDurationBetweenRepsSeconds': 60,
      'defRestDurationBetweenSetsSeconds': 180,
      'userID': 1
    };

    // TODO add userID property
    workoutPost.userID = 1;
    this.store.dispatch(new AddWorkout(fakeWorkout));
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
