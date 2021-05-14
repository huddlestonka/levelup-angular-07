import { Injectable } from '@angular/core';
import { Movement } from '@bba/api-interfaces';
import { Action, ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import * as MovementsActions from './movements.actions';
import * as fromMovements from './movements.reducer';
import * as MovementsSelectors from './movements.selectors';

@Injectable({
  providedIn: 'root',
})
export class MovementsFacade {
  loaded$ = this.store.pipe(select(MovementsSelectors.getMovementsLoaded));
  allMovements$ = this.store.pipe(select(MovementsSelectors.getAllMovements));
  selectedMovement$ = this.store.pipe(
    select(MovementsSelectors.getSelectedMovement)
  );

  mutations$ = this.actions$.pipe(
    filter(
      (action: Action) =>
        action.type === MovementsActions.createMovement({} as any).type ||
        action.type === MovementsActions.updateMovement({} as any).type ||
        action.type === MovementsActions.deleteMovement({} as any).type
    )
  );

  constructor(
    private store: Store<fromMovements.MovementsPartialState>,
    private actions$: ActionsSubject
  ) {}

  selectMovement(selectedId: string) {
    this.dispatch(MovementsActions.selectMovement({ selectedId }));
  }

  loadMovements() {
    this.dispatch(MovementsActions.loadMovements());
  }

  loadMovement(movementId: string) {
    this.dispatch(MovementsActions.loadMovement({ movementId }));
  }

  createMovement(movement: Movement) {
    // We are generate the UUID at the client because of a sqlite limitation
    this.dispatch(
      MovementsActions.createMovement({
        movement: Object.assign({}, movement, { id: uuidv4() }),
      })
    );
  }

  updateMovement(movement: Movement) {
    this.dispatch(MovementsActions.updateMovement({ movement }));
  }

  deleteMovement(movement: Movement) {
    this.dispatch(MovementsActions.deleteMovement({ movement }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
