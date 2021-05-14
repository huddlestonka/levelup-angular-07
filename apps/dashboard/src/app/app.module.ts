import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutDetailsComponent } from './workouts/workout-details/workout-details.component';
import { WorkoutsListComponent } from './workouts/workouts-list/workouts-list.component';
import { MovementsComponent } from './movements/movements.component';
import { MovementDetailsComponent } from './movements/movement-details/movement-details.component';
import { MovementsListComponent } from './movements/movements-list/movements-list.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { MaterialModule } from '@bba/material';
import { UiToolbarModule } from '@bba/ui-toolbar';
import { HttpClientModule } from '@angular/common/http';
import { CoreStateModule } from '@bba/core-state';
import { CoreDataModule } from '@bba/core-data';

@NgModule({
  declarations: [
    AppComponent,
    WorkoutsComponent,
    WorkoutDetailsComponent,
    WorkoutsListComponent,
    MovementsComponent,
    MovementDetailsComponent,
    MovementsListComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    RoutingModule,
    MaterialModule,
    CoreStateModule,
    CoreDataModule,
    UiToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
