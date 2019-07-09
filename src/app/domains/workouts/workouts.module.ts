import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutsRoutingModule } from './workouts-routing.module';
import { CreateWorkoutComponent } from './containers/create-workout/create-workout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CreateWorkoutComponent],
  imports: [
    TranslateModule,
    CommonModule,
    WorkoutsRoutingModule,
    FormsModule, ReactiveFormsModule,
    NgZorroAntdModule,
    SharedModule,
  ]
})
export class WorkoutsModule { }
