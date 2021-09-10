import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'src/app/core/response';
import { BaseService } from 'src/app/services/base-service';
import { AuthService } from '../auth/auth.service';
import { UserProfile } from './user-profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends BaseService {
  private data: UserProfile;
  loaded: boolean;

  constructor(private http: HttpClient, private auth: AuthService) {
    super();
  }

  private getProfileAPI(): Observable<any> {
    return this.http.get(`${this.api}/user/profile`).pipe(this.getResponse(), this.getError());
  }

  getProfile(): Observable<UserProfile> {
    if (this.loaded) {
      return of(this.data);
    } else {
      return this.getProfileAPI().pipe(
        map((res: Response) => {
          this.data = new UserProfile(res.data);
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
