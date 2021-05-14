import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { WorkoutsEntity } from './workouts.models';
import { WorkoutsEffects } from './workouts.effects';
import { WorkoutsFacade } from './workouts.facade';

import * as WorkoutsSelectors from './workouts.selectors';
import * as WorkoutsActions from './workouts.actions';
import {
  WORKOUTS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './workouts.reducer';

interface TestSchema {
  workouts: State;
}

describe('WorkoutsFacade', () => {
  let facade: WorkoutsFacade;
  let store: Store<TestSchema>;
  const createWorkoutsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as WorkoutsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(WORKOUTS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([WorkoutsEffects]),
        ],
        providers: [WorkoutsFacade],
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
      facade = TestBed.inject(WorkoutsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allWorkouts$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allWorkouts$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadWorkoutsSuccess` to manually update list
     */
    it('allWorkouts$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allWorkouts$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          WorkoutsActions.loadWorkoutsSuccess({
            workouts: [
              createWorkoutsEntity('AAA'),
              createWorkoutsEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allWorkouts$);
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
