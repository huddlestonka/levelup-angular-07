import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as WorkoutsFeature from './workouts.reducer';
import * as WorkoutsActions from './workouts.actions';

@Injectable()
export class WorkoutsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkoutsActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return WorkoutsActions.loadWorkoutsSuccess({ workouts: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return WorkoutsActions.loadWorkoutsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
