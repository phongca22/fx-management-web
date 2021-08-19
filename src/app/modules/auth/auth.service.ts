import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/core/role';
import { BaseService } from 'src/app/services/base-service';
import { StorageService } from 'src/app/services/storage.service';
import { StoreService } from 'src/app/services/store.service';
import { User } from '../store/user/user';

export const TOKEN_NAME = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  user: User;

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
      .post(`${this.api}/auth/register`, {
        username: user,
        password: pass
      })
      .pipe(this.getResponse(), this.getError());
  }

  getToken(): string | null {
    const t = this.storage.get('token');
    if (t) {
      return (JSON.parse(t) as User).token;
    } else {
      return null;
    }
  }

  setToken(data: User): void {
    this.storage.set('token', JSON.stringify(data));
  }

hasToken(): boolean {
    const token = this.getToken();
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  setUser(data: User) {
    this.user = data;
    this.store.setUser(data);
  }

  hasPermission(id: Role): boolean {
    return [Role.Admin, Role.Doctor, Role.Coodirnator, Role.User].includes(id);
  }
}
