import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movement } from '@bba/api-interfaces';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class MovementsService {
  model = 'movements';

  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<Movement[]>(this.getUrl());
  }

  find(id: string) {
    return this.http.get<Movement>(this.getUrlWithId(id));
  }

  create(movement: Movement) {
    return this.http.post(this.getUrl(), movement);
  }

  update(movement: Movement) {
    return this.http.put(this.getUrlWithId(movement.id), movement);
  }

  delete(movement: Movement) {
    return this.http.delete(this.getUrlWithId(movement.id));
  }

  private getUrl() {
    return `${environment.apiEndpoint}${this.model}`;
  }

  private getUrlWithId(id) {
    return `${this.getUrl()}/${id}`;
  }
}
