import { CreateWorkoutComponent } from './containers/create-workout/create-workout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutCatalogComponent } from './containers/workout-catalog/workout-catalog.component';

const routes: Routes = [
  {
    path: 'catalog',
    component: WorkoutCatalogComponent,
    data: {}
  },
  {
    path: 'create',
    component: CreateWorkoutComponent,
    data: {}
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutsRoutingModule {}
