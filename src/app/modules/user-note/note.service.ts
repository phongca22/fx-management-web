import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { isEmpty } from 'lodash';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserInfo } from 'src/app/core/user-info';
import { UserNote } from 'src/app/core/user-note';
import { BaseService } from 'src/app/services/base-service';
import { AddNoteComponent } from './add-note/add-note.component';

@Injectable({
  providedIn: 'root'
})
export class NoteService extends BaseService {
  newNoteEvent: Subject<UserNote>;
  constructor(private http: HttpClient, private dialog: MatDialog) {
    super();
    this.newNoteEvent = new Subject();
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

  showAddNote(data: UserInfo): Observable<UserNote | null> {
    return this.dialog
      .open(AddNoteComponent, {
        data: data,
        width: '100%',
        height: '100%',
        maxWidth: '96vw',
        maxHeight: '96vh'
      })
      .afterClosed()
      .pipe(
        map((val: UserNote | string) => (isEmpty(val) ? null : (val as UserNote))),
        tap((val: UserNote | null) => {
          if (val) {
            this.newNoteEvent.next(val);
          }
        })
      );
  }

  listenNewNote() {
    return this.newNoteEvent;
  }
}
