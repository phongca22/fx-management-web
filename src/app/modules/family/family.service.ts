import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base-service';

@Injectable({
  providedIn: 'root'
})
export class FamilyService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  addMember(id: number, name: string, doctorId: number): Observable<any> {
    return this.http
      .put(`${this.api}/family/member`, {
        id: id,
        name: name,
        doctorId: doctorId
      })
      .pipe(this.getResponse(), this.getError());
  }
}
