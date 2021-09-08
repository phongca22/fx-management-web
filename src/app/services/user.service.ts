import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isNil } from 'lodash';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from '../core/response';
import { UserConditionType } from '../core/user-condition.enum';
import { Transporter } from '../core/volunteer';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  private transporterLoaded: boolean;
  private transporters: Transporter[];

  constructor(private http: HttpClient) {
    super();
  }

  clearTransporters(): void {
    this.transporterLoaded = false;
    this.transporters = [];
  }

  createUser(data: any): Observable<any> {
    return this.http.post(`${this.api}/auth/create`, data).pipe(this.getResponse(), this.getError());
  }

  find(data: string): Observable<any> {
    return this.http.put(`${this.api}/user/find`, { key: data }).pipe(this.getResponse(), this.getError());
  }

  updateUser(data: any): Observable<any> {
    return this.http.put(`${this.api}/user/update`, data).pipe(this.getResponse(), this.getError());
  }

  getAllUsers(page: number): Observable<any> {
    return this.http
      .get(`${this.api}/user/all`, {
        params: {
          page: page.toString()
        }
      })
      .pipe(this.getResponse(), this.getError());
  }

  getByPendingSupport(page: number): Observable<any> {
    return this.http
      .get(`${this.api}/user/by/pending-support`, {
        params: {
          page: page.toString()
        }
      })
      .pipe(this.getResponse(), this.getError());
  }

  getByDoctor(page: number): Observable<any> {
    page = isNil(page) ? 0 : page;
    return this.http
      .get(`${this.api}/user/by/doctor`, {
        params: {
          page: page.toString()
        }
      })
      .pipe(this.getResponse(), this.getError());
  }

  getByTransporter(page: number): Observable<any> {
    page = isNil(page) ? 0 : page;
    return this.http
      .get(`${this.api}/user/by/transporter`, {
        params: {
          page: page.toString()
        }
      })
      .pipe(this.getResponse(), this.getError());
  }

  getByEmergency(page: number): Observable<any> {
    page = isNil(page) ? 0 : page;
    return this.http
      .get(`${this.api}/user/by/emergency`, {
        params: {
          page: page.toString()
        }
      })
      .pipe(this.getResponse(), this.getError());
  }

  getTransporters(): Observable<Transporter[]> {
    if (this.transporterLoaded) {
      return of(this.transporters);
    } else {
      return this.getTransportersAPI().pipe(
        map((res: Response) => {
          this.transporterLoaded = true;
          if (res.ok) {
            this.transporters = res.data.map((val: any) => new Transporter(val));
            return this.transporters;
          } else {
            return [];
          }
        })
      );
    }
  }

  getTransportersAPI(): Observable<any> {
    return this.http.get(`${this.api}/config/transporters`).pipe(this.getResponse(), this.getError());
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
}
