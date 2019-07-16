import { AddWorkout, UpdateWorkout } from './../../../../state/workouts.state';
import { Workout } from './../../../../model/workout';
import { ListItem } from 'src/app/shared/interfaces/interfaces';
import { AppService } from './../../../../services/app.service';
import { Store } from '@ngxs/store';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-workout',
  templateUrl: './edit-workout.component.html',
  styleUrls: ['./edit-workout.component.scss']
})
export class EditWorkoutComponent implements OnInit {

  @Input() energySystemOptions: Observable<ListItem[]>;
  @Input() locationOptions: Observable<ListItem[]>;
  @Input() experienceLevelOptions: Observable<ListItem[]>;

  // @Input() formvalues: any; // If we are editing an existing workout, the form must be initialized with these values
  @Input() workout: Observable<Workout>; // If we are editing an existing workout, the form must be initialized with these values

  workoutForm: FormGroup;
  // Lookup values
  locationOptionsList: ListItem[] = [];

  values: any[] | null = null;

  isUpdate = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private appService: AppService) {

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

    // We need a static object for payload mapping
    this.locationOptions
      .pipe(
        map(l => {
          this.locationOptionsList = l;
          console.log('Location options:', l);
        })
      ).subscribe();

      this.workout.subscribe((wdata) => {
       // alert('Inner component workout: duration = ' +  wdata.duration.toString());

       if (wdata.id && wdata.id > 0) {
         console.log('Updating workout');
        this.isUpdate = true;
       }

        // Patch form values
        this.workoutForm.patchValue(wdata);
      });
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
      const facilityName = this.locationOptionsList.find(x => x.id === formvalue.facilities[f]).description;
      console.log('Facility name', facilityName);
      facilityObjects.push({
        id: formvalue.facilities[f],
        description: facilityName
      });
    }
    formvalue.facilities = facilityObjects;


    // Create workout to post and add missing (yet) static properties
    const workoutPost = new Workout(formvalue);
    workoutPost.userID = 1;
    workoutPost.active = true;
    workoutPost.public = false;

    if (this.workoutForm.valid) {
      if (this.isUpdate === false) {
        // Create a new workout
        this.store.dispatch(new AddWorkout(workoutPost)).subscribe(() => {
          // clear form and do navigation when action finished
          this.appService.displaySuccessMessage('Workout created');
          this.workoutForm.reset();
          this.router.navigateByUrl('/workouts');
        });
      } else {
        // Update an existing workout
        this.store.dispatch(new UpdateWorkout(workoutPost)).subscribe(() => {
          // clear form and do navigation when action finished
          this.appService.displaySuccessMessage('Workout created');
          this.workoutForm.reset();
          this.router.navigateByUrl('/workouts');
        });
      }
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
