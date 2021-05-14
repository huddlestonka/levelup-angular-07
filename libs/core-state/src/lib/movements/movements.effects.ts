import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as MovementsFeature from './movements.reducer';
import * as MovementsActions from './movements.actions';

@Injectable()
export class MovementsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovementsActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return MovementsActions.loadMovementsSuccess({ movements: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return MovementsActions.loadMovementsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
