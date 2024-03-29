import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sortBy } from 'lodash';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Response } from '../core/response';
import { Support } from '../core/support';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService extends BaseService {
  supports: Support[];
  version: string = environment.version;

  constructor(private http: HttpClient) {
    super();
  }

  getSupports(): Observable<any> {
    return this.http.get(`${environment.host}/config/supports`).pipe(
      this.getResponse(),
      tap((res: Response) => {
        if (res.ok) {
          this.supports = sortBy(
            res.data.map((val: any) => new Support(val)),
            ['id']
          );
        }
      }),
      this.getError()
    );
  }
}
