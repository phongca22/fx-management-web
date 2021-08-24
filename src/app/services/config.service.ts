import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Response } from '../core/response';
import { Support } from '../core/support';
import { UserConditionType } from '../core/user-condition.enum';
import { UserSupport } from '../core/user-support';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService extends BaseService {
  supports: Support[];
  status: UserConditionType[] = [
    UserConditionType.Processing,
    UserConditionType.Recovered,
    UserConditionType.Hospitalized
  ];

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
