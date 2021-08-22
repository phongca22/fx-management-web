import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Doctor } from '../core/doctor';
import { Response } from '../core/response';
import { Support } from '../core/support';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  doctors: Doctor[];
  supports: Support[];
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

  getPendings(): Observable<any> {
    return this.http.get(`${this.api}/user/pending`).pipe(this.getResponse(), this.getError());
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

  getSupports(): Observable<any> {
    return this.http.get(`${this.api}/user/supports`).pipe(
      this.getResponse(),
      tap((res: Response) => {
        if (res.ok) {
          this.supports = res.data.map((val: any) => new Support(val));
        }
      }),
      this.getError()
    );
  }

  setSupports(id: number, data: number[]): Observable<any> {
    return this.http
      .put(`${this.api}/user/supports`, {
        id: id,
        supports: data
      })
      .pipe(this.getResponse(), this.getError());
  }
}
