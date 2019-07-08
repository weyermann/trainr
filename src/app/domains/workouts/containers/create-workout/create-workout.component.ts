import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.scss']
})
export class CreateWorkoutComponent implements OnInit {

  workoutForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // TODO use right form fields

    // id: number;
    // workoutName: string;
    // energySystemID: number;
    // energySubtypeID: number;
    // synopsis: string;
    // shortDescription: string;
    // longDescription: string;
    // facilityID: number;
    // facilityOptID: number;
    // duration: number;
    // experienceLevel: number;
    // isPublic: boolean;
    // isActive: boolean;

    // numberOfSets: number;
    // numberOfRepsPerSet: number;
    // loadDurationSeconds: number;
    // restDurationBetweenRepsSeconds: number;
    // restDurationBetweenSetsSeconds: number;


    this.workoutForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm: [''],
      comment: ['', [Validators.required]]
    });
  }

  ngOnInit() {
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
    this.workoutForm.reset();
    // tslint:disable-next-line:forin
    for (const key in this.workoutForm.controls) {
      this.workoutForm.controls[key].markAsPristine();
      this.workoutForm.controls[key].updateValueAndValidity();
    }
  }

}
