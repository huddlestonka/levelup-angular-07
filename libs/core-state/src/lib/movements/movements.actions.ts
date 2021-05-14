import { createAction, props } from '@ngrx/store';
import { MovementsEntity } from './movements.models';

export const init = createAction('[Movements Page] Init');

export const loadMovementsSuccess = createAction(
  '[Movements/API] Load Movements Success',
  props<{ movements: MovementsEntity[] }>()
);

export const loadMovementsFailure = createAction(
  '[Movements/API] Load Movements Failure',
  props<{ error: any }>()
);
