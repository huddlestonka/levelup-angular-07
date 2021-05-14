import { WorkoutsEntity } from './workouts.models';
import { State, workoutsAdapter, initialState } from './workouts.reducer';
import * as WorkoutsSelectors from './workouts.selectors';

describe('Workouts Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getWorkoutsId = (it) => it['id'];
  const createWorkoutsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as WorkoutsEntity);

  let state;

  beforeEach(() => {
    state = {
      workouts: workoutsAdapter.setAll(
        [
          createWorkoutsEntity('PRODUCT-AAA'),
          createWorkoutsEntity('PRODUCT-BBB'),
          createWorkoutsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Workouts Selectors', () => {
    it('getAllWorkouts() should return the list of Workouts', () => {
      const results = WorkoutsSelectors.getAllWorkouts(state);
      const selId = getWorkoutsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = WorkoutsSelectors.getSelected(state);
      const selId = getWorkoutsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getWorkoutsLoaded() should return the current 'loaded' status", () => {
      const result = WorkoutsSelectors.getWorkoutsLoaded(state);

      expect(result).toBe(true);
    });

    it("getWorkoutsError() should return the current 'error' state", () => {
      const result = WorkoutsSelectors.getWorkoutsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
