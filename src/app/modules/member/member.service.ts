import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base-service';

@Injectable({
  providedIn: 'root'
})
export class MemberService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  addMember(id: number, name: string): Observable<any> {
    return this.http
      .put(`${this.api}/member`, {
        userId: id,
        name: name
      })
      .pipe(this.getResponse(), this.getError());
  }

  removeMember(userId: number, id: number): Observable<any> {
    return this.http.delete(`${this.api}/member/${userId}/${id}`).pipe(this.getResponse(), this.getError());
  }
}
