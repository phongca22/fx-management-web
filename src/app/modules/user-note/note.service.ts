import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { isEmpty, isNil } from 'lodash';
import { Observable, Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { UserInfo } from 'src/app/core/user-info';
import { UserNote } from 'src/app/core/user-note';
import { BaseService } from 'src/app/services/base-service';
import { AddNoteComponent } from './add-note/add-note.component';

@Injectable({
  providedIn: 'root'
})
export class NoteService extends BaseService {
  refreshEvent: Subject<void>;
  constructor(private http: HttpClient, private dialog: MatDialog) {
    super();
    this.refreshEvent = new Subject();
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
        maxWidth: '100vw',
        maxHeight: '100vh',
        panelClass: 'mat-dialog-no-padding'
      })
      .afterClosed()
      .pipe(filter((val: UserNote) => !isEmpty(val) && !isNil(val)));
  }

  listenRefresh() {
    return this.refreshEvent;
  }
}
