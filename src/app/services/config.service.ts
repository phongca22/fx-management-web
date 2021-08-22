import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Doctor } from '../core/doctor';
import { Response } from '../core/response';
import { Support } from '../core/support';
import { UserStatusType } from '../core/user-status.enum';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService extends BaseService {
  doctors: Doctor[];
  supports: Support[];
  status: UserStatusType[] = [UserStatusType.Processing, UserStatusType.Recovered, UserStatusType.Hospitalized];

  constructor(private http: HttpClient) {
    super();
  }

  getSupports(): Observable<any> {
    return this.http.get('/config/supports').pipe(
      this.getResponse(),
      tap((res: Response) => {
        if (res.ok) {
          this.supports = res.data.map((val: any) => new Support(val));
        }
      }),
      this.getError()
    );
  }
}
