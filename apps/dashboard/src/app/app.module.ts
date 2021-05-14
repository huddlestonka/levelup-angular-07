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

@NgModule({
  declarations: [AppComponent, WorkoutsComponent, WorkoutDetailsComponent, WorkoutsListComponent, MovementsComponent, MovementDetailsComponent, MovementsListComponent, HomeComponent],
  imports: [BrowserModule, BrowserAnimationsModule, StoreModule.forRoot({}, {})],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
