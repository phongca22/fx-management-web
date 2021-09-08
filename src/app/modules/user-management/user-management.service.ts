import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { General } from 'src/app/core/general';
import { Response } from 'src/app/core/response';
import { BaseService } from 'src/app/services/base-service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService extends BaseService {
  roles: General[];
  roleLoaded: boolean;

  constructor(private http: HttpClient) {
    super();
  }

  getRoles(): Observable<any> {
    if (this.roleLoaded) {
      return of(this.roles);
    } else {
      return this.getRolesAPI().pipe(
        map((res: Response) => {
          this.roleLoaded = true;
          if (res.ok) {
            this.roles = res.data.map((val: any) => new General(val));
            return this.roles;
          } else {
            return [];
          }
        })
      );
    }
  }

  getRolesAPI(): Observable<any> {
    return this.http.get(`${this.api}/config/roles`).pipe(this.getResponse(), this.getError());
  }

  getAll(page: number): Observable<any> {
    return this.http
      .get(`${this.api}/user/admin/all`, {
        params: {
          page: page.toString()
        }
      })
      .pipe(this.getResponse(), this.getError());
  }

  create({ user, pass, name, role }: any): Observable<any> {
    return this.http
      .post(`${this.api}/auth/admin/create`, {
        user: user,
        pass: pass,
        name: name,
        role: role.id
      })
      .pipe(this.getResponse(), this.getError());
  }

  update(id: number, { name, role }: any): Observable<any> {
    return this.http
      .put(`${this.api}/user/admin/update`, {
        id: id,
        name: name,
        role: role.id
      })
      .pipe(this.getResponse(), this.getError());
  }
}
