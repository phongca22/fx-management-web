import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../core/user-info';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  getActiveDoctors(): Observable<any> {
    return this.http.get(`${this.api}/doctor/active`).pipe(this.getResponse(), this.getError());
  }

  getDoctors(): Observable<any> {
    return this.http.get(`${this.api}/doctor/all`).pipe(this.getResponse(), this.getError());
  }

  setDoctor(user: UserInfo, data: number): Observable<any> {
    return this.http
      .put(`${this.api}/doctor/assign`, {
        userId: user.id,
        doctorId: data
      })
      .pipe(this.getResponse(), this.getError());
  }

  setActive(id: number, active: boolean): Observable<any> {
    return this.http
      .post(`${this.api}/doctor/active`, {
        id: id,
        active: active
      })
      .pipe(this.getResponse(), this.getError());
  }
}
