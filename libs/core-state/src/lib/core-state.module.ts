import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromWorkouts from './workouts/workouts.reducer';
import { WorkoutsEffects } from './workouts/workouts.effects';
import { WorkoutsFacade } from './workouts/workouts.facade';
import * as fromMovements from './movements/movements.reducer';
import { MovementsEffects } from './movements/movements.effects';
import { MovementsFacade } from './movements/movements.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromWorkouts.WORKOUTS_FEATURE_KEY,
      fromWorkouts.reducer
    ),
    EffectsModule.forFeature([WorkoutsEffects]),
    StoreModule.forFeature(
      fromMovements.MOVEMENTS_FEATURE_KEY,
      fromMovements.reducer
    ),
    EffectsModule.forFeature([MovementsEffects]),
  ],
  providers: [WorkoutsFacade, MovementsFacade],
})
export class CoreStateModule {}
