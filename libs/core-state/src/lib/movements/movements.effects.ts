import { Injectable } from '@angular/core';
import { Movement } from '@bba/api-interfaces';
import { MovementsService } from '@bba/core-data';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import * as MovementsActions from './movements.actions';

@Injectable()
export class MovementsEffects {
  @Effect() loadMovements$ = this.actions$.pipe(
    ofType(MovementsActions.loadMovements),
    fetch({
      run: (action) =>
        this.movementsService
          .all()
          .pipe(
            map((movements: Movement[]) =>
              MovementsActions.loadMovementsSuccess({ movements })
            )
          ),
      onError: (action, error) =>
        MovementsActions.loadMovementsFailure({ error }),
    })
  );

  @Effect() loadMovement$ = this.actions$.pipe(
    ofType(MovementsActions.loadMovement),
    fetch({
      run: (action) =>
        this.movementsService
          .find(action.movementId)
          .pipe(
            map((movement: Movement) =>
              MovementsActions.loadMovementSuccess({ movement })
            )
          ),
      onError: (action, error) =>
        MovementsActions.loadMovementFailure({ error }),
    })
  );

  @Effect() createMovement$ = this.actions$.pipe(
    ofType(MovementsActions.createMovement),
    pessimisticUpdate({
      run: (action) =>
        this.movementsService
          .create(action.movement)
          .pipe(
            map((movement: Movement) =>
              MovementsActions.createMovementSuccess({ movement })
            )
          ),
      onError: (action, error) =>
        MovementsActions.createMovementFailure({ error }),
    })
  );

  @Effect() updateMovement$ = this.actions$.pipe(
    ofType(MovementsActions.updateMovement),
    pessimisticUpdate({
      run: (action) =>
        this.movementsService
          .update(action.movement)
          .pipe(
            map((movement: Movement) =>
              MovementsActions.updateMovementSuccess({ movement })
            )
          ),
      onError: (action, error) =>
        MovementsActions.updateMovementFailure({ error }),
    })
  );

  @Effect() deleteMovement$ = this.actions$.pipe(
    ofType(MovementsActions.deleteMovement),
    pessimisticUpdate({
      run: (action) =>
        this.movementsService
          .delete(action.movement)
          .pipe(
            map((movement: Movement) =>
              MovementsActions.deleteMovementSuccess({ movement })
            )
          ),
      onError: (action, error) =>
        MovementsActions.deleteMovementFailure({ error }),
    })
  );

  constructor(
    private actions$: Actions,
    private movementsService: MovementsService
  ) {}
}
