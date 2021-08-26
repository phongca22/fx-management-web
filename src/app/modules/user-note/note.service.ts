import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base-service';

@Injectable({
  providedIn: 'root'
})
export class NoteService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  addNote(id: number, content: string): Observable<any> {
    return this.http
      .post(`${this.api}/note/add`, {
        userId: id,
        content: content
      })
      .pipe(this.getResponse(), this.getError());
  }

  getNotes(id: number): Observable<any> {
    return this.http.get(`${this.api}/note/${id}`).pipe(this.getResponse(), this.getError());
  }
}
