import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isNil } from 'lodash';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Doctor } from '../core/doctor';
import { Response } from '../core/response';
import { UserConditionType } from '../core/user-condition.enum';
import { UserInfo } from '../core/user-info';
import { Volunteer } from '../core/volunteer';
import { User } from '../modules/store/user/user';
import { BaseService } from './base-service';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  doctors: Doctor[];
  volunteers: Volunteer[];

  constructor(private http: HttpClient, private store: StoreService) {
    super();
  }

  createUser(data: any): Observable<any> {
    return this.http.post(`${this.api}/user/create`, data).pipe(this.getResponse(), this.getError());
  }

  find(data: string): Observable<any> {
    return this.http.put(`${this.api}/user/find`, { key: data }).pipe(this.getResponse(), this.getError());
  }

  updateUser(data: any): Observable<any> {
    return this.http.put(`${this.api}/user/update`, data).pipe(this.getResponse(), this.getError());
  }

  getPending(page?: number): Observable<any> {
    page = isNil(page) ? 0 : page;
    return this.http
      .get(`${this.api}/users/pending`, {
        params: {
          page: page.toString()
        }
      })
      .pipe(this.getResponse(), this.getError());
  }

  getByDoctor(id: number, page?: number): Observable<any> {
    page = isNil(page) ? 0 : page;
    return this.http
      .get(`${this.api}/users/doctor/${id}`, {
        params: {
          page: page.toString()
        }
      })
      .pipe(this.getResponse(), this.getError());
  }

  getByTransporter(id: number, page?: number): Observable<any> {
    page = isNil(page) ? 0 : page;
    return this.http
      .get(`${this.api}/users/transporter/${id}`, {
        params: {
          page: page.toString()
        }
      })
      .pipe(this.getResponse(), this.getError());
  }

  getDoctors(): Observable<any> {
    return this.http.get(`${this.api}/doctors`).pipe(
      this.getResponse(),
      tap((res: Response) => {
        if (res.ok) {
          this.doctors = res.data.map((val: any) => new Doctor(val));
        }
      }),
      this.getError()
    );
  }

  getVolunteers(): Observable<any> {
    return this.http.get(`${this.api}/volunteers`).pipe(
      this.getResponse(),
      tap((res: Response) => {
        if (res.ok) {
          this.volunteers = res.data.map((val: any) => new Volunteer(val));
        }
      }),
      this.getError()
    );
  }

  getUserInfo(id: number): Observable<any> {
    return this.http.get(`${this.api}/user/info/${id}`).pipe(this.getResponse(), this.getError());
  }

  setCondition(id: number, data: UserConditionType): Observable<any> {
    return this.http
      .put(`${this.api}/user/condition`, {
        id: id,
        conditionId: data
      })
      .pipe(this.getResponse(), this.getError());
  }

  setDoctor(user: UserInfo, data: number): Observable<any> {
    return this.http
      .put(`${this.api}/user/doctor/change`, {
        userId: user.id,
        daId: user.doctorAssignmentId,
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
