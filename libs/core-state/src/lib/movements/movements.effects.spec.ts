import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot, cold } from '@nrwl/angular/testing';

import { Observable } from 'rxjs';

import { MovementsEffects } from './movements.effects';
import * as MovementsActions from './movements.actions';
import { MovementsService } from '@bba/core-data';

import { mockMovementsService, mockMovement } from '@bba/testing';
import { Movement } from '@bba/api-interfaces';

describe('MovementsEffects', () => {
  let actions: Observable<any>;
  let effects: MovementsEffects;
  let service: MovementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        MovementsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        { provide: MovementsService, useValue: mockMovementsService },
      ],
    });

    effects = TestBed.inject(MovementsEffects);
    service = TestBed.inject(MovementsService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadMovements$', () => {
    it('should return loadMovementsSuccess, on success', () => {
      const movements: Movement[] = [];
      const action = MovementsActions.loadMovements();
      const outcome = MovementsActions.loadMovementsSuccess({ movements });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: movements });
      const expected = cold('--b', { b: outcome });
      service.all = jest.fn(() => response);

      expect(effects.loadMovements$).toBeObservable(expected);
    });

    it('should return loadMovementsFailure, on failure', () => {
      const action = MovementsActions.loadMovements();
      const error = new Error();
      const outcome = MovementsActions.loadMovementsFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.all = jest.fn(() => response);

      expect(effects.loadMovements$).toBeObservable(expected);
    });
  });

  describe('loadMovement$', () => {
    it('should return success with movement', () => {
      const movement = { ...mockMovement };
      const action = MovementsActions.loadMovement({ movementId: movement.id });
      const outcome = MovementsActions.loadMovementSuccess({ movement });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: movement });
      const expected = cold('--b', { b: outcome });
      service.find = jest.fn(() => response);

      expect(effects.loadMovement$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const movement = { ...mockMovement };
      const action = MovementsActions.loadMovement({ movementId: movement.id });
      const error = new Error();
      const outcome = MovementsActions.loadMovementFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.find = jest.fn(() => response);

      expect(effects.loadMovement$).toBeObservable(expected);
    });
  });

  describe('createMovement$', () => {
    it('should return success with movement', () => {
      const movement = { ...mockMovement };
      const action = MovementsActions.createMovement({ movement });
      const outcome = MovementsActions.createMovementSuccess({ movement });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: movement });
      const expected = cold('--b', { b: outcome });
      service.create = jest.fn(() => response);

      expect(effects.createMovement$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const movement = { ...mockMovement };
      const action = MovementsActions.createMovement({ movement });
      const error = new Error();
      const outcome = MovementsActions.createMovementFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.create = jest.fn(() => response);

      expect(effects.createMovement$).toBeObservable(expected);
    });
  });

  describe('updateMovement$', () => {
    it('should return success with movement', () => {
      const movement = { ...mockMovement };
      const action = MovementsActions.updateMovement({ movement });
      const outcome = MovementsActions.updateMovementSuccess({ movement });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: movement });
      const expected = cold('--b', { b: outcome });
      service.update = jest.fn(() => response);

      expect(effects.updateMovement$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const movement = { ...mockMovement };
      const action = MovementsActions.updateMovement({ movement });
      const error = new Error();
      const outcome = MovementsActions.updateMovementFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.update = jest.fn(() => response);

      expect(effects.updateMovement$).toBeObservable(expected);
    });
  });

  describe('deleteMovement$', () => {
    it('should return success with movement', () => {
      const movement = { ...mockMovement };
      const action = MovementsActions.deleteMovement({ movement });
      const outcome = MovementsActions.deleteMovementSuccess({ movement });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: movement });
      const expected = cold('--b', { b: outcome });
      service.delete = jest.fn(() => response);

      expect(effects.deleteMovement$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const movement = { ...mockMovement };
      const action = MovementsActions.deleteMovement({ movement });
      const error = new Error();
      const outcome = MovementsActions.deleteMovementFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.delete = jest.fn(() => response);

      expect(effects.deleteMovement$).toBeObservable(expected);
    });
  });
});
