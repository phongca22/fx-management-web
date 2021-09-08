import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Doctor } from '../core/doctor';
import { Response } from '../core/response';
import { UserInfo } from '../core/user-info';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService extends BaseService {
  private doctors: Doctor[];
  activeDoctors: Doctor[];
  loaded: boolean;

  constructor(private http: HttpClient) {
    super();
  }

  clearCache(): void {
    this.loaded = false;
    this.doctors = [];
  }

  getActiveDoctors(): Observable<any> {
    return this.http.get(`${this.api}/doctor/active`).pipe(this.getResponse(), this.getError());
  }

  getDoctors(): Observable<Doctor[]> {
    if (this.loaded) {
      return of(this.doctors);
    } else {
      return this.getDoctorsAPI().pipe(
        map((res: Response) => {
          this.loaded = true;
          if (res.ok) {
            this.doctors = res.data.map((val: any) => new Doctor(val));
            return this.doctors;
          } else {
            return [];
          }
        })
      );
    }
  }

  private getDoctorsAPI(): Observable<any> {
    return this.http.get(`${this.api}/doctor/all`).pipe(this.getResponse(), this.getError());
  }

  setDoctor(user: UserInfo, data: number): Observable<any> {
    return this.http
      .put(`${this.api}/doctor/assign`, {
        userId: user.id,
        daId: user.doctorAssignmentId,
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
