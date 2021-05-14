import { TestBed } from '@angular/core/testing';
import { ActionsSubject } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { MovementsFacade } from './movements.facade';
import * as MovementsActions from './movements.actions';
import { initialMovementsState } from './movements.reducer';

import { mockMovement } from '@bba/testing';

describe('MovementsFacade', () => {
  let facade: MovementsFacade;
  let actionSubject;
  const mockActionsSubject = new ActionsSubject();
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovementsFacade,
        provideMockStore({ initialState: initialMovementsState }),
        { provide: ActionsSubject, useValue: mockActionsSubject },
      ],
    });

    facade = TestBed.inject(MovementsFacade);
    actionSubject = TestBed.inject(ActionsSubject);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should have mutations', (done) => {
    const action = MovementsActions.createMovement({ movement: mockMovement });
    actionSubject.next(action);

    facade.mutations$.subscribe((result) => {
      expect(result).toBe(action);
      done();
    });
  });

  describe('should dispatch', () => {
    it('select on select(movement.id)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.selectMovement(mockMovement.id);

      const action = MovementsActions.selectMovement({
        selectedId: mockMovement.id,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('loadMovements on loadMovements()', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.loadMovements();

      const action = MovementsActions.loadMovements();

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('loadMovement on loadMovement(movement.id)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.loadMovement(mockMovement.id);

      const action = MovementsActions.loadMovement({
        movementId: mockMovement.id,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('createMovement on createMovement(movement)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.createMovement(mockMovement);

      const action = MovementsActions.createMovement({
        movement: mockMovement,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('updateMovement on updateMovement(movement)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.updateMovement(mockMovement);

      const action = MovementsActions.updateMovement({
        movement: mockMovement,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('delete on delete(model)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.deleteMovement(mockMovement);

      const action = MovementsActions.deleteMovement({
        movement: mockMovement,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });
  });
});
