import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutsRoutingModule } from './workouts-routing.module';
import { CreateWorkoutComponent } from './containers/create-workout/create-workout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SharedModule } from 'src/app/shared/shared.module';
import { CatalogComponent } from './components/catalog/catalog.component';
import { EditWorkoutComponent } from './components/edit-workout/edit-workout.component';

@NgModule({
  declarations: [CreateWorkoutComponent, CatalogComponent, EditWorkoutComponent],
  imports: [
    TranslateModule,
    CommonModule,
    WorkoutsRoutingModule,
    FormsModule, ReactiveFormsModule,
    NgZorroAntdModule,
    SharedModule
  ],
  exports: [CatalogComponent],
})
export class WorkoutsModule { }
