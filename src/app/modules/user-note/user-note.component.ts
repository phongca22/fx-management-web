import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import { chain, groupBy, isEmpty, keys } from 'lodash';
import { takeUntil } from 'rxjs/operators';
import { Response } from 'src/app/core/response';
import { Role } from 'src/app/core/role';
import { UserInfo } from 'src/app/core/user-info';
import { UserNote } from 'src/app/core/user-note';
import { DestroyService } from 'src/app/services/destroy.service';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../auth/auth.service';
import { NoteService } from './note.service';

dayjs.extend(customParseFormat);

@Component({
  selector: 'app-user-note',
  templateUrl: './user-note.component.html',
  styleUrls: ['./user-note.component.scss'],
  providers: [DestroyService]
})
export class UserNoteComponent implements OnInit {
  @Input() user: UserInfo;
  @Input() notes: UserNote[];
  @Output() notesChange = new EventEmitter<UserNote[]>();
  loaded: boolean;
  groups: { id: number; name: string; notes: UserNote[] }[];
  isCoordinator: boolean;
  isDoctor: boolean;

  constructor(
    private service: NoteService,
    private readonly $destroy: DestroyService,
    private alert: AlertService,
    private auth: AuthService
  ) {
    this.isCoordinator = this.auth.hasRole(Role.Coodirnator);
    this.isDoctor = this.auth.hasRole(Role.Doctor);
    this.service
      .listenNewNote()
      .pipe(takeUntil(this.$destroy))
      .subscribe((val: UserNote) => {
        this.notes.unshift(val);
        this.combineData();
      });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    if (!isEmpty(this.notes)) {
      this.combineData();
      return;
    }

    this.service
      .getNotes(this.user.id)
      .pipe(takeUntil(this.$destroy))
      .subscribe((res: Response) => {
        this.loaded = true;
        if (res.ok) {
          this.notes = res.data.map((val: any) => new UserNote(val));
          this.combineData();
        } else {
          this.alert.error();
        }
      });
  }

  combineData(): void {
    this.notesChange.emit(this.notes);
    const t = groupBy(this.notes, 'date');
    this.groups = chain(keys(t))
      .map((date: string) => {
        return {
          id: dayjs(date, 'DD-MM-YYYY').millisecond(),
          name: date,
          notes: t[date]
        };
      })
      .orderBy(['id'], ['desc'])
      .value();
  }

  isEmpty(): boolean {
    return this.loaded && isEmpty(this.notes);
  }
}
