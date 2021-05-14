import {
  MovementsState,
  movementsAdapter,
  initialMovementsState,
} from './movements.reducer';
import * as MovementsSelectors from './movements.selectors';

import { Movement } from '@bba/api-interfaces';
import { mockMovement } from '@bba/testing';

describe('Movements Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getMovementsId = (it) => it['id'];
  const createMovement = (id: string, name = '') =>
    ({ ...mockMovement, id: id } as Movement);

  let state;

  beforeEach(() => {
    state = {
      movements: movementsAdapter.setAll(
        [
          createMovement('PRODUCT-AAA'),
          createMovement('PRODUCT-BBB'),
          createMovement('PRODUCT-CCC'),
        ],
        {
          ...initialMovementsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Movements Selectors', () => {
    it('getAllMovements() should return the list of Movements', () => {
      const results = MovementsSelectors.getAllMovements(state);
      const selId = getMovementsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = MovementsSelectors.getSelectedMovement(state);
      const selId = getMovementsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getMovementsLoaded() should return the current 'loaded' status", () => {
      const result = MovementsSelectors.getMovementsLoaded(state);

      expect(result).toBe(true);
    });

    it("getMovementsError() should return the current 'error' state", () => {
      const result = MovementsSelectors.getMovementsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
