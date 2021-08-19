import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Response } from '../core/response';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  api: string;

  constructor() {
    this.api = `${environment.host}/api`;
  }

  getResponse() {
    return map(
      (res: any) =>
        new Response({
          ok: true,
          code: 200,
          data: res
        })
    );
  }

  getError() {
    return catchError((res: any) => {
      return of(
        new Response({
          ok: false,
          code: res.status,
          errorCode: res.error.code,
          message: res.error.message
        })
      );
    });
  }
}
