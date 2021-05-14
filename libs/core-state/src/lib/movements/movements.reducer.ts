import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as MovementsActions from './movements.actions';
import { MovementsEntity } from './movements.models';

export const MOVEMENTS_FEATURE_KEY = 'movements';

export interface State extends EntityState<MovementsEntity> {
  selectedId?: string | number; // which Movements record has been selected
  loaded: boolean; // has the Movements list been loaded
  error?: string | null; // last known error (if any)
}

export interface MovementsPartialState {
  readonly [MOVEMENTS_FEATURE_KEY]: State;
}

export const movementsAdapter: EntityAdapter<MovementsEntity> = createEntityAdapter<MovementsEntity>();

export const initialState: State = movementsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const movementsReducer = createReducer(
  initialState,
  on(MovementsActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(MovementsActions.loadMovementsSuccess, (state, { movements }) =>
    movementsAdapter.setAll(movements, { ...state, loaded: true })
  ),
  on(MovementsActions.loadMovementsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return movementsReducer(state, action);
}
