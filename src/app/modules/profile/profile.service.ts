import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base-service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  getInfo(): Observable<any> {
    return this.http.get(`${this.api}/user/info`).pipe(this.getResponse(), this.getError());
  }
}
