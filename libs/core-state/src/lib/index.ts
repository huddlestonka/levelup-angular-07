import { Params } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  createSelector,
  MetaReducer,
} from '@ngrx/store';

import * as fromWorkouts from './workouts/workouts.reducer';
import * as fromMovements from './movements/movements.reducer';

import * as WorkoutsSelectors from './workouts/workouts.selectors';
import * as MovementsSelectors from './movements/movements.selectors';
import { Workout, Movement } from '@bba/api-interfaces';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

// ---------------------------------------
// Core State and Reducers
// ---------------------------------------

export interface AppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  [fromWorkouts.WORKOUTS_FEATURE_KEY]: fromWorkouts.WorkoutsState;
  [fromMovements.MOVEMENTS_FEATURE_KEY]: fromMovements.MovementsState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  [fromWorkouts.WORKOUTS_FEATURE_KEY]: fromWorkouts.workoutsReducer,
  [fromMovements.MOVEMENTS_FEATURE_KEY]: fromMovements.movementsReducer,
};

// -------------------------------------------------------------------
// Common Selectors
// -------------------------------------------------------------------
export const getWorkoutMovements = createSelector(
  WorkoutsSelectors.getAllWorkouts,
  MovementsSelectors.getAllMovements,
  (workouts: Workout[], movements: Movement[]) => {
    return workouts.map((workout) => ({
      ...workout,
      movements: movements.filter(
        (movement) => movement.workoutId === workout.id
      ),
    }));
  }
);
