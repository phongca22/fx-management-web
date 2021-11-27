import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class AgentService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  getAgents(): Observable<any> {
    return this.http.get(`${this.api}/agent/all`).pipe(this.getResponse(), this.getError());
  }

  setActive(id: number, active: boolean): Observable<any> {
    return this.http
      .post(`${this.api}/agent/${id}/active`, {
        active: active
      })
      .pipe(this.getResponse(), this.getError());
  }

  edit(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/agent/${id}/edit`, data).pipe(this.getResponse(), this.getError());
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.api}/agent/create`, data).pipe(this.getResponse(), this.getError());
  }
}
