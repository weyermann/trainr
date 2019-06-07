import { WorkoutCatalogComponent } from './domains/workouts/containers/workout-catalog/workout-catalog.component';
import { MainCategoriesComponent } from './domains/categories/containers/main-categories/main-categories.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'categories',
    component: MainCategoriesComponent,
    data: {}
  },
  {
    path: 'catalog',
    component: WorkoutCatalogComponent,
    data: {}
  },
  {
    path: '',
    redirectTo: '/categories',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
