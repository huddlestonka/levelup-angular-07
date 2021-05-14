import { Movement } from '@bba/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as MovementsActions from './movements.actions';

export const MOVEMENTS_FEATURE_KEY = 'movements';

export interface MovementsState extends EntityState<Movement> {
  selectedId?: string | number; // which Movements record has been selected
  loaded: boolean; // has the Movements list been loaded
  error?: string | null; // last known error (if any)
}

export interface MovementsPartialState {
  readonly [MOVEMENTS_FEATURE_KEY]: MovementsState;
}

export const movementsAdapter: EntityAdapter<Movement> = createEntityAdapter<Movement>();

export const initialMovementsState: MovementsState = movementsAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

const onFailure = (state, { error }) => ({ ...state, error });

const _movementsReducer = createReducer(
  initialMovementsState,
  on(MovementsActions.selectMovement, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  on(MovementsActions.resetSelectedMovement, (state) =>
    Object.assign({}, state, { selectedId: null })
  ),
  on(MovementsActions.resetMovements, (state) =>
    movementsAdapter.removeAll(state)
  ),
  // Load movements
  on(MovementsActions.loadMovements, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(MovementsActions.loadMovementsSuccess, (state, { movements }) =>
    movementsAdapter.setAll(movements, { ...state, loaded: true })
  ),
  on(MovementsActions.loadMovementsFailure, onFailure),
  // Load movement
  on(MovementsActions.loadMovement, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(MovementsActions.loadMovementSuccess, (state, { movement }) =>
    movementsAdapter.upsertOne(movement, { ...state, loaded: true })
  ),
  on(MovementsActions.loadMovementFailure, onFailure),
  // Add movement
  on(MovementsActions.createMovementSuccess, (state, { movement }) =>
    movementsAdapter.addOne(movement, state)
  ),
  on(MovementsActions.createMovementFailure, onFailure),
  // Update movement
  on(MovementsActions.updateMovementSuccess, (state, { movement }) =>
    movementsAdapter.updateOne({ id: movement.id, changes: movement }, state)
  ),
  on(MovementsActions.updateMovementFailure, onFailure),
  // Delete movement
  on(MovementsActions.deleteMovementSuccess, (state, { movement }) =>
    movementsAdapter.removeOne(movement.id, state)
  ),
  on(MovementsActions.deleteMovementFailure, onFailure)
);

export function movementsReducer(
  state: MovementsState | undefined,
  action: Action
) {
  return _movementsReducer(state, action);
}
