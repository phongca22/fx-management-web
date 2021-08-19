import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { isNil } from 'lodash';
import { Observable } from 'rxjs';
import { hasRole, Role } from 'src/app/core/role';
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
        username: user,
        password: pass
      })
      .pipe(this.getResponse(), this.getError());
  }

  register(user: string, pass: string): Observable<any> {
    return this.http
      .post(`${this.api}/auth/signup`, {
        username: user,
        password: pass
      })
      .pipe(this.getResponse(), this.getError());
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

  hasPermission(id: Role): boolean {
    return hasRole(id);
  }

  isApiUrl(data: string): boolean {
    return data.startsWith(`${environment.host}/api/`);
  }

  removeUser() {
    this.storage.remove('token');
    this.user = null;
    this.store.resetUser();
  }

  logout(): void {
    this.removeUser();
  }
}
