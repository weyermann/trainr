import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

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

  workoutForm: FormGroup;
  energySystemOptions: any; // TODO load from api, put in store

  constructor(private fb: FormBuilder) {

    this.workoutForm = this.fb.group({
      workoutName: ['', Validators.required],
      energySystem: ['', Validators.required],
      synopsis: ['', Validators.required],
      shortDescription: ['', Validators.required],
      longDescription: ['', Validators.required],
      facility: ['', Validators.required],
      optionalFacility: ['', Validators.required],
      approxDuration: ['', Validators.required],
      experienceLevel: [''],

      defaultNumberOfSets: [''],
      defaultNumberOfRepsPerSet: [''],
      defaultLoadDurationSeconds: [''],
      defaultRestDurationBetweenRepsSeconds: [''],
      defaultRestDurationBetweenSetsSeconds: [''],
    });
  }

  ngOnInit() {
    this.locationOptions = ['Climbing gym', 'Bouldering gym', 'Home wall', 'Fitness club', 'Crag', 'Outdoor boulder area'];
  }

  submitForm(value: any): void {
    // tslint:disable-next-line:forin
    for (const key in this.workoutForm.controls) {
      this.workoutForm.controls[key].markAsDirty();
      this.workoutForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
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
