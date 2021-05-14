import * as MovementsActions from './movements.actions';
import {
  MovementsState,
  initialMovementsState,
  movementsReducer,
} from './movements.reducer';
import { mockMovement, mockEmptyMovement } from '@bba/testing';

describe('Movements Reducer', () => {
  let movements;

  beforeEach(() => {
    movements = [
      { ...mockMovement, id: '0' },
      { ...mockMovement, id: '1' },
      { ...mockMovement, id: '2' },
    ];
  });

  describe('valid Movements actions', () => {
    it('loadMovements should set loaded to false', () => {
      const action = MovementsActions.loadMovements();
      const expectedState = {
        ...initialMovementsState,
        error: null,
      };

      const result: MovementsState = movementsReducer(
        initialMovementsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('loadMovementsSuccess should set the list of known Movements', () => {
      const action = MovementsActions.loadMovementsSuccess({ movements });
      const expectedState = {
        ...initialMovementsState,
        loaded: true,
        entities: {
          0: movements[0],
          1: movements[1],
          2: movements[2],
        },
        ids: movements.map((movement) => movement.id),
      };

      const result: MovementsState = movementsReducer(
        initialMovementsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('loadMovementsFailure should set error to error', () => {
      const error = new Error();
      const action = MovementsActions.loadMovementsFailure({ error });
      const expectedState = {
        ...initialMovementsState,
        error,
      };

      const result: MovementsState = movementsReducer(
        initialMovementsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('loadMovement should set loaded to false', () => {
      const action = MovementsActions.loadMovement({
        movementId: mockMovement.id,
      });
      const expectedState = {
        ...initialMovementsState,
        loaded: false,
        error: null,
      };

      const result: MovementsState = movementsReducer(
        initialMovementsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('loadMovementSuccess should set loaded to true', () => {
      const action = MovementsActions.loadMovementSuccess({
        movement: mockMovement,
      });
      const expectedState = {
        ...initialMovementsState,
        loaded: true,
        entities: {
          0: mockMovement,
        },
        ids: [mockMovement.id],
      };

      const result: MovementsState = movementsReducer(
        initialMovementsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('loadMovementFailure should set error to error', () => {
      const error = new Error();
      const action = MovementsActions.loadMovementFailure({ error });
      const expectedState = {
        ...initialMovementsState,
        error,
      };

      const result: MovementsState = movementsReducer(
        initialMovementsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('updateMovementSuccess should modify movement', () => {
      const prepAction = MovementsActions.loadMovementSuccess({
        movement: { ...mockEmptyMovement, id: mockMovement.id },
      });
      const prepState: MovementsState = movementsReducer(
        initialMovementsState,
        prepAction
      );

      const expectedState = {
        ...initialMovementsState,
        loaded: true,
        entities: {
          0: mockMovement,
        },
        ids: [mockMovement.id],
      };

      const action = MovementsActions.updateMovementSuccess({
        movement: mockMovement,
      });
      const result: MovementsState = movementsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('updateMovementFailure should set error to error', () => {
      const error = new Error();
      const action = MovementsActions.updateMovementFailure({ error });
      const expectedState = {
        ...initialMovementsState,
        error,
      };

      const result: MovementsState = movementsReducer(
        initialMovementsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('createMovementSuccess should add movement', () => {
      const action = MovementsActions.createMovementSuccess({
        movement: mockMovement,
      });
      const expectedState = {
        ...initialMovementsState,
        loaded: false,
        entities: {
          0: mockMovement,
        },
        ids: [mockMovement.id],
      };

      const result: MovementsState = movementsReducer(
        initialMovementsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('createMovementFailure should set error to error', () => {
      const error = new Error();
      const action = MovementsActions.createMovementFailure({ error });
      const expectedState = {
        ...initialMovementsState,
        error,
      };

      const result: MovementsState = movementsReducer(
        initialMovementsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('deleteMovementSuccess should add movement', () => {
      const prepAction = MovementsActions.loadMovementSuccess({
        movement: mockMovement,
      });
      const prepState: MovementsState = movementsReducer(
        initialMovementsState,
        prepAction
      );

      const expectedState = {
        ...initialMovementsState,
        loaded: true,
      };

      const action = MovementsActions.deleteMovementSuccess({
        movement: mockMovement,
      });
      const result: MovementsState = movementsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('deleteMovementFailure should set error to error', () => {
      const error = new Error();
      const action = MovementsActions.deleteMovementFailure({ error });
      const expectedState = {
        ...initialMovementsState,
        error,
      };

      const result: MovementsState = movementsReducer(
        initialMovementsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('selectMovement should set selectedId', () => {
      const action = MovementsActions.selectMovement({
        selectedId: mockMovement.id,
      });
      const expectedState = {
        ...initialMovementsState,
        selectedId: mockMovement.id,
      };

      const result: MovementsState = movementsReducer(
        initialMovementsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('resetSelectedMovement should reset selectedId', () => {
      const prepAction = MovementsActions.selectMovement({
        selectedId: mockMovement.id,
      });
      const prepState = movementsReducer(initialMovementsState, prepAction);

      const action = MovementsActions.resetSelectedMovement();
      const expectedState = {
        ...initialMovementsState,
        selectedId: null,
      };

      const result: MovementsState = movementsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('resetMovements should reset movements', () => {
      const prepAction = MovementsActions.loadMovementsSuccess({ movements });
      const prepState: MovementsState = movementsReducer(
        initialMovementsState,
        prepAction
      );

      const expectedState = {
        ...initialMovementsState,
        loaded: true,
      };

      const action = MovementsActions.resetMovements();
      const result: MovementsState = movementsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result: MovementsState = movementsReducer(
        initialMovementsState,
        action
      );

      expect(result).toBe(initialMovementsState);
    });
  });
});
