import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { WorkoutCatalogComponent } from './workouts/workout-catalog/workout-catalog.component';
import { MainCategoriesComponent } from './intro/main-categories/main-categories.component';
import { SideNavigationComponent } from './nav/side-navigation/side-navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkoutCatalogComponent,
    MainCategoriesComponent,
    SideNavigationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
