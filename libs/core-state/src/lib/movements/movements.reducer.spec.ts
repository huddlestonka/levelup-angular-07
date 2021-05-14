import { MovementsEntity } from './movements.models';
import * as MovementsActions from './movements.actions';
import { State, initialState, reducer } from './movements.reducer';

describe('Movements Reducer', () => {
  const createMovementsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as MovementsEntity);

  beforeEach(() => {});

  describe('valid Movements actions', () => {
    it('loadMovementsSuccess should return set the list of known Movements', () => {
      const movements = [
        createMovementsEntity('PRODUCT-AAA'),
        createMovementsEntity('PRODUCT-zzz'),
      ];
      const action = MovementsActions.loadMovementsSuccess({ movements });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
