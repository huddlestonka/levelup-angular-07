import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Workout } from '@bba/api-interfaces';

import { WorkoutsService } from './workouts.service';

import { mockWorkout } from '@bba/testing';

describe('WorkoutsService', () => {
  const model = 'workouts';
  let httpTestingController: HttpTestingController;
  let service: WorkoutsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(WorkoutsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should call http.', () => {
    it('get() on service.all()', () => {
      service.all().subscribe((res) => {
        expect(res).toEqual(mockWorkout);
      });

      const req = httpTestingController.expectOne(service['getUrl']());
      req.flush([mockWorkout]);
      httpTestingController.verify();
    });

    it('get(url(model.id)) on service.find(model.id)', () => {
      service.find(mockWorkout.id).subscribe((res) => {
        expect(res).toEqual(mockWorkout);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockWorkout.id)
      );
      req.flush(mockWorkout);
      httpTestingController.verify();
    });

    it('post(url, model) on service.create(model)', () => {
      service.create(mockWorkout).subscribe((res) => {
        expect(res).toEqual(mockWorkout);
      });

      const req = httpTestingController.expectOne(service['getUrl']());
      req.flush(mockWorkout);
      httpTestingController.verify();
    });

    it('put(url(model.id), model) on service.create(model)', () => {
      service.update(mockWorkout).subscribe((res) => {
        expect(res).toEqual(mockWorkout);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockWorkout.id)
      );
      req.flush(mockWorkout);
      httpTestingController.verify();
    });

    it('delete(url(model.id)) on service.delete(model.id)', () => {
      service.delete(mockWorkout).subscribe((res) => {
        expect(res).toEqual(mockWorkout);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockWorkout.id)
      );
      req.flush(mockWorkout);
      httpTestingController.verify();
    });
  });
});
