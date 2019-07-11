import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { WorkoutCatalogComponent } from './domains/workouts/containers/workout-catalog/workout-catalog.component';
import { MainCategoriesComponent } from './domains/categories/containers/main-categories/main-categories.component';
import { SideNavigationComponent } from './nav/side-navigation/side-navigation.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TestCardComponent } from './shared/components/test-card/test-card.component';
import { LangSelectorComponent } from './shared/components/lang-selector/lang-selector.component';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { WorkoutsModule } from './domains/workouts/workouts.module';
import { MainCategoriesModule } from './domains/categories/main-categories.module';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { WorkoutCatalogState } from './state/workouts.state';
import { SharedState } from './state/shared.state';

registerLocaleData(en);

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
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgxsModule.forRoot([
      WorkoutCatalogState,
      SharedState,
    ], { developmentMode: true }),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(), // This should be the last import (at least of the ngxs imports)
    WorkoutsModule,
    MainCategoriesModule,
    NgZorroAntdModule,
    FormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
