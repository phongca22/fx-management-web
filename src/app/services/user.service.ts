import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isNil } from 'lodash';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Doctor } from '../core/doctor';
import { Response } from '../core/response';
import { UserConditionType } from '../core/user-condition.enum';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  doctors: Doctor[];

  constructor(private http: HttpClient) {
    super();
  }

  createUser(data: any): Observable<any> {
    return this.http.post(`${this.api}/user/create`, data).pipe(this.getResponse(), this.getError());
  }

  findByCode(data: string): Observable<any> {
    return this.http.put(`${this.api}/user/search`, { code: data }).pipe(this.getResponse(), this.getError());
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
    return this.http.get(`${this.api}/user/${id}/info`).pipe(this.getResponse(), this.getError());
  }

  setSupports(id: number, data: number[]): Observable<any> {
    return this.http
      .put(`${this.api}/user/supports`, {
        id: id,
        supports: data
      })
      .pipe(this.getResponse(), this.getError());
  }

  setCondition(id: number, data: UserConditionType): Observable<any> {
    return this.http
      .put(`${this.api}/user/condition`, {
        id: id,
        conditionId: data
      })
      .pipe(this.getResponse(), this.getError());
  }

  getNotes(id: number): Observable<any> {
    return this.http.get(`${this.api}/user/notes/` + id).pipe(this.getResponse(), this.getError());
  }

  addNote(id: number, content: string): Observable<any> {
    return this.http
      .put(`${this.api}/user/notes`, {
        id: id,
        content: content
      })
      .pipe(this.getResponse(), this.getError());
  }
}
