import { WorkoutsEntity } from './workouts.models';
import * as WorkoutsActions from './workouts.actions';
import { State, initialState, reducer } from './workouts.reducer';

describe('Workouts Reducer', () => {
  const createWorkoutsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as WorkoutsEntity);

  beforeEach(() => {});

  describe('valid Workouts actions', () => {
    it('loadWorkoutsSuccess should return set the list of known Workouts', () => {
      const workouts = [
        createWorkoutsEntity('PRODUCT-AAA'),
        createWorkoutsEntity('PRODUCT-zzz'),
      ];
      const action = WorkoutsActions.loadWorkoutsSuccess({ workouts });

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
