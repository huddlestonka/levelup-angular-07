import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Movement } from '@bba/api-interfaces';

import { MovementsService } from './movements.service';

import { mockMovement } from '@bba/testing';

describe('MovementsService', () => {
  const model = 'movements';
  let httpTestingController: HttpTestingController;
  let service: MovementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(MovementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should call http.', () => {
    it('get() on service.all()', () => {
      service.all().subscribe((res) => {
        expect(res).toEqual(mockMovement);
      });

      const req = httpTestingController.expectOne(service['getUrl']());
      req.flush([mockMovement]);
      httpTestingController.verify();
    });

    it('get(url(model.id)) on service.find(model.id)', () => {
      service.find(mockMovement.id).subscribe((res) => {
        expect(res).toEqual(mockMovement);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockMovement.id)
      );
      req.flush(mockMovement);
      httpTestingController.verify();
    });

    it('post(url, model) on service.create(model)', () => {
      service.create(mockMovement).subscribe((res) => {
        expect(res).toEqual(mockMovement);
      });

      const req = httpTestingController.expectOne(service['getUrl']());
      req.flush(mockMovement);
      httpTestingController.verify();
    });

    it('put(url(model.id), model) on service.create(model)', () => {
      service.update(mockMovement).subscribe((res) => {
        expect(res).toEqual(mockMovement);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockMovement.id)
      );
      req.flush(mockMovement);
      httpTestingController.verify();
    });

    it('delete(url(model.id)) on service.delete(model.id)', () => {
      service.delete(mockMovement).subscribe((res) => {
        expect(res).toEqual(mockMovement);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockMovement.id)
      );
      req.flush(mockMovement);
      httpTestingController.verify();
    });
  });
});
