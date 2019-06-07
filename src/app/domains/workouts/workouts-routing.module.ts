import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutCatalogComponent } from './containers/workout-catalog/workout-catalog.component';

const routes: Routes = [
  {
    path: 'catalog',
    component: WorkoutCatalogComponent,
    data: {}
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutsRoutingModule {}
