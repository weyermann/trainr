import { WorkoutService } from './../../../../api-services/workout.service';
import { AppService } from './../../../../services/app.service';
import { Workout } from './../../../../model/workout';
import { AddWorkout } from './../../../../state/workouts.state';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';
import { Store } from '@ngxs/store';
import { SharedState } from 'src/app/state/shared.state';
import { ListItem } from 'src/app/shared/interfaces/interfaces';
import { map, switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
  workout$: Observable<Workout>;

  // Observable lists
  energySystemOptions$: Observable<ListItem[]>;
  locationOptions$: Observable<ListItem[]>;
  experienceLevelOptions$: Observable<ListItem[]>;

  // Lookup values
  locationOptions: ListItem[] = [];

  workoutForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
    private workoutService: WorkoutService) {

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

    // this.workout$ = of(this.workoutForm.value);

    // this.workout$.subscribe((wdata) => {
    //   alert('Subscribed workout: duration = ' +  wdata.duration.toString());

    //   this.workoutForm.patchValue(wdata);
    // });
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

      // Check for routing parameter workoutID and load workout for editing
      const workoutID: Observable<string> = this.route.params.pipe(map(p => p.id));

      workoutID.subscribe((id => {
        if (+id > 0) {
          this.workout$ = this.workoutService.getWorkout(+id);

          this.workout$.subscribe((wdata) => {
            alert('Subscribed workout: duration = ' +  wdata.duration.toString());

            // Patch form values
            // this.workoutForm.patchValue(wdata);
            // this.workoutForm.controls.workoutName.setValue(wdata.workoutName);
          });
        }
      }));

      // Does not work either
      // this.workoutForm.controls.workoutName.setValue('Quatschname');

      // this.workout$ = this.route.paramMap.pipe(
      //   switchMap((params: ParamMap) =>
      //     this.workoutService.getWorkout(+params.get('id')))
      // );

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


    // Create workout to post and add missing (yet) static properties
    const workoutPost = new Workout(formvalue);
    workoutPost.userID = 1;
    workoutPost.active = true;
    workoutPost.public = false;

    if (this.workoutForm.valid) {
      this.store.dispatch(new AddWorkout(workoutPost)).subscribe(() => {
        // clear form and do navigation when action finished
        this.appService.displaySuccessMessage('Workout created');
        this.workoutForm.reset();
        this.router.navigateByUrl('/workouts');
      });
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
