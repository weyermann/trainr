import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutsRoutingModule } from './workouts-routing.module';
import { CreateWorkoutComponent } from './containers/create-workout/create-workout.component';

@NgModule({
  declarations: [CreateWorkoutComponent],
  imports: [
    CommonModule,
    WorkoutsRoutingModule
  ]
})
export class WorkoutsModule { }
