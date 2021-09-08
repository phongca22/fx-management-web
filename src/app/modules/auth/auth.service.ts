import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { every, intersection, isNil } from 'lodash';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Role } from 'src/app/core/role';
import { BaseService } from 'src/app/services/base-service';
import { StorageService } from 'src/app/services/storage.service';
import { StoreService } from 'src/app/services/store.service';
import { environment } from 'src/environments/environment';
import { User } from '../store/user/user';

export const TOKEN_NAME = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  user: User | null;

  constructor(private http: HttpClient, private storage: StorageService, private store: StoreService) {
    super();
  }

  login(user: string, pass: string): Observable<any> {
    return this.http
      .post(`${this.api}/auth/signin`, {
        user: user,
        pass: pass
      })
      .pipe(this.getResponse(), this.getError());
  }

  // register(user: string, pass: string): Observable<any> {
  //   return this.http
  //     .post(`${this.api}/auth/signup`, {
  //       user: user,
  //       pass: pass
  //     })
  //     .pipe(this.getResponse(), this.getError());
  // }

  logoutAPI(): Observable<any> {
    return this.http.get(`${this.api}/auth/signout`).pipe(this.getResponse(), this.getError());
  }

  getToken(): string | null {
    return this.storage.get('token');
  }

  setToken(data: string): void {
    this.storage.set('token', data);
  }

  hasToken(): boolean {
    return !isNil(this.getToken());
  }

  setUser(token: string) {
    this.user = new User(jwt_decode(token));
    this.store.setUser(this.user);
  }

  hasAnyRole(data: Role[]): boolean {
    return intersection(this.user?.roles, data).length > 0;
  }

  hasRole(data: Role): boolean {
    if (this.user?.roles) {
      return this.user?.roles.includes(data);
    } else {
      return false;
    }
  }

  isApiUrl(data: string): boolean {
    return data.startsWith(`${environment.host}/api/`);
  }

  removeUser() {
    this.storage.remove('token');
    this.user = null;
    this.store.resetUser();
  }

  logout(): Observable<any> {
    return this.logoutAPI().pipe(finalize(() => this.removeUser()));
  }
}
