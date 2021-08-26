import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isNil } from 'lodash';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Doctor } from '../core/doctor';
import { Response } from '../core/response';
import { UserConditionType } from '../core/user-condition.enum';
import { User } from '../modules/store/user/user';
import { BaseService } from './base-service';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  doctors: Doctor[];

  constructor(private http: HttpClient, private store: StoreService) {
    super();
  }

  createUser(data: any): Observable<any> {
    return this.http.post(`${this.api}/user/create`, data).pipe(this.getResponse(), this.getError());
  }

  find(data: string): Observable<any> {
    return this.http.put(`${this.api}/user/find`, { code: data }).pipe(this.getResponse(), this.getError());
  }

  updateUser(data: any): Observable<any> {
    return this.http.put(`${this.api}/user/update`, data).pipe(this.getResponse(), this.getError());
  }

  getUsers(page?: number): Observable<any> {
    page = isNil(page) ? 0 : page;
    return this.http
      .get(`${this.api}/users`, {
        params: {
          page: page.toString()
        }
      })
      .pipe(this.getResponse(), this.getError());
  }

  getDoctors(): Observable<any> {
    return this.http.get(`${this.api}/user/doctors`).pipe(
      this.getResponse(),
      tap((res: Response) => {
        if (res.ok) {
          this.doctors = res.data.map((val: any) => new Doctor(val));
        }
      }),
      this.getError()
    );
  }

  getUserInfo(id: number): Observable<any> {
    return this.http.get(`${this.api}/user/info/${id}`).pipe(this.getResponse(), this.getError());
  }

  setSupports(id: number, data: number[]): Observable<any> {
    return this.http
      .put(`${this.api}/user/supports`, {
        id: id,
        supports: data
      })
      .pipe(this.getResponse(), this.getError());
  }

  setSupportStatus(data: any[]): Observable<any> {
    return this.http.put(`${this.api}/user/support-status`, data).pipe(this.getResponse(), this.getError());
  }

  getSupportStatusDetail(id: number): Observable<any> {
    return this.http.get(`${this.api}/user/support-status/${id}`).pipe(this.getResponse(), this.getError());
  }

  setCondition(id: number, data: UserConditionType): Observable<any> {
    return this.http
      .put(`${this.api}/user/condition`, {
        id: id,
        conditionId: data
      })
      .pipe(this.getResponse(), this.getError());
  }

  setDoctor(id: number, data: number): Observable<any> {
    return this.http
      .put(`${this.api}/user/doctors`, {
        id: id,
        doctorId: data
      })
      .pipe(this.getResponse(), this.getError());
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.api}/user/profile`).pipe(
      this.getResponse(),
      tap((res: Response) => {
        this.store.setUser({ name: res.data.fullname } as User);
      }),
      this.getError()
    );
  }
}
