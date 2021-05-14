import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as MovementsActions from './movements.actions';
import * as MovementsFeature from './movements.reducer';
import * as MovementsSelectors from './movements.selectors';

@Injectable()
export class MovementsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(MovementsSelectors.getMovementsLoaded));
  allMovements$ = this.store.pipe(select(MovementsSelectors.getAllMovements));
  selectedMovements$ = this.store.pipe(select(MovementsSelectors.getSelected));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(MovementsActions.init());
  }
}
