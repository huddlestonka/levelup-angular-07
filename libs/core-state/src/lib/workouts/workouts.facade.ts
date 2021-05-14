import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as WorkoutsActions from './workouts.actions';
import * as WorkoutsFeature from './workouts.reducer';
import * as WorkoutsSelectors from './workouts.selectors';

@Injectable()
export class WorkoutsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(WorkoutsSelectors.getWorkoutsLoaded));
  allWorkouts$ = this.store.pipe(select(WorkoutsSelectors.getAllWorkouts));
  selectedWorkouts$ = this.store.pipe(select(WorkoutsSelectors.getSelected));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(WorkoutsActions.init());
  }
}
