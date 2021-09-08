import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'src/app/core/response';
import { User } from 'src/app/core/user';
import { BaseService } from 'src/app/services/base-service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends BaseService {
  private data: User;
  loaded: boolean;

  constructor(private http: HttpClient, private auth: AuthService) {
    super();
  }

  private getProfileAPI(): Observable<any> {
    return this.http.get(`${this.api}/user/profile`).pipe(this.getResponse(), this.getError());
  }

  getProfile(): Observable<User> {
    if (this.loaded) {
      return of(this.data);
    } else {
      return this.getProfileAPI().pipe(
        map((res: Response) => {
          this.data = new User(res.data);
          this.loaded = true;
          return this.data;
        })
      );
    }
  }

  logout(): Observable<any> {
    this.loaded = false;
    return this.auth.logout();
  }
}
