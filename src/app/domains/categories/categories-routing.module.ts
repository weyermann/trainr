import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainCategoriesComponent } from './containers/main-categories/main-categories.component';

const routes: Routes = [
  {
    path: 'categories',
    component: MainCategoriesComponent,
    data: {}
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {}
