import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { MovementsEntity } from './movements.models';
import { MovementsEffects } from './movements.effects';
import { MovementsFacade } from './movements.facade';

import * as MovementsSelectors from './movements.selectors';
import * as MovementsActions from './movements.actions';
import {
  MOVEMENTS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './movements.reducer';

interface TestSchema {
  movements: State;
}

describe('MovementsFacade', () => {
  let facade: MovementsFacade;
  let store: Store<TestSchema>;
  const createMovementsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as MovementsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(MOVEMENTS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([MovementsEffects]),
        ],
        providers: [MovementsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(MovementsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allMovements$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allMovements$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadMovementsSuccess` to manually update list
     */
    it('allMovements$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allMovements$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          MovementsActions.loadMovementsSuccess({
            movements: [
              createMovementsEntity('AAA'),
              createMovementsEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allMovements$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
