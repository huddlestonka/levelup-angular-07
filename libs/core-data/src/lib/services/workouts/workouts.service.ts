import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workout } from '@bba/api-interfaces';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkoutsService {
  model = 'workouts';

  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<Workout[]>(this.getUrl());
  }

  find(id: string) {
    return this.http.get<Workout>(this.getUrlWithId(id));
  }

  create(workout: Workout) {
    return this.http.post(this.getUrl(), workout);
  }

  update(workout: Workout) {
    return this.http.put(this.getUrlWithId(workout.id), workout);
  }

  delete(workout: Workout) {
    return this.http.delete(this.getUrlWithId(workout.id));
  }

  private getUrl() {
    return `${environment.apiEndpoint}${this.model}`;
  }

  private getUrlWithId(id) {
    return `${this.getUrl()}/${id}`;
  }
}
