import { Movement } from '@bba/api-interfaces';
import { of } from 'rxjs';

export const mockMovementsFacade = {
  loadMovements: () => {},
  selectMovement: () => {},
  deleteMovement: () => {},
  updateMovement: () => {},
  createMovement: () => {},
  mutations$: of(true),
};

export const mockMovementsService = {
  all: () => of([]),
  find: () => of({ ...mockMovement }),
  create: () => of({ ...mockMovement }),
  update: () => of({ ...mockMovement }),
  delete: () => of({ ...mockMovement }),
};

export const mockMovement = {
  id: '0',
  title: 'mock',
  description: 'mock',
  workoutId: 'mock',
};

export const mockEmptyMovement = {
  id: null,
  title: 'mockEmpty',
  description: 'mockEmpty',
  workoutId: 'mockEmpty',
};
