import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { WorkoutCatalogComponent } from './workouts/workout-catalog/workout-catalog.component';
import { MainCategoriesComponent } from './categories/main-categories/main-categories.component';
import { SideNavigationComponent } from './nav/side-navigation/side-navigation.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TestCardComponent } from './shared/components/test-card/test-card.component';
import { LangSelectorComponent } from './shared/components/lang-selector/lang-selector.component';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    WorkoutCatalogComponent,
    MainCategoriesComponent,
    SideNavigationComponent,
    TestCardComponent,
    LangSelectorComponent

  ],
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    NgxsModule.forRoot([], { developmentMode: true }),
    NgxsLoggerPluginModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    NgxsReduxDevtoolsPluginModule.forRoot() // This should be the last import (at least of the ngxs imports)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
