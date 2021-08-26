import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as dayjs from 'dayjs';
import { chain, groupBy, isEmpty, isNil, keys } from 'lodash';
import { filter, takeUntil } from 'rxjs/operators';
import { Response } from 'src/app/core/response';
import { UserInfo } from 'src/app/core/user-info';
import { UserNote } from 'src/app/core/user-note';
import { DestroyService } from 'src/app/services/destroy.service';
import { AlertService } from '../alert/alert.service';
import { AddNoteComponent } from './add-note/add-note.component';
import { NoteService } from './note.service';

@Component({
  selector: 'app-user-note',
  templateUrl: './user-note.component.html',
  styleUrls: ['./user-note.component.scss'],
  providers: [DestroyService]
})
export class UserNoteComponent implements OnInit {
  notes: UserNote[];
  loaded: boolean;
  groups: { id: number; name: string; notes: UserNote[] }[];

  constructor(
    private service: NoteService,
    private readonly $destroy: DestroyService,
    private alert: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service
      .getNotes(this.data.id)
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
    const t = groupBy(this.notes, 'date');
    this.groups = chain(keys(t))
      .map((date: string) => {
        return {
          id: dayjs(date, 'DD-MM-YYYY').get('millisecond'),
          name: date,
          notes: t[date]
        };
      })
      .orderBy(['id'], ['desc'])
      .value();
    console.log(t);
  }

  isEmpty(): boolean {
    return this.loaded && isEmpty(this.notes);
  }

  addNote(): void {
    this.dialog
      .open(AddNoteComponent, {
        data: this.data,
        width: '100%',
        height: '100%',
        maxWidth: '96vw',
        maxHeight: '96vh'
      })
      .afterClosed()
      .pipe(filter((val: UserNote) => !isNil(val) && !isEmpty(val)))
      .subscribe((val: UserNote) => {
        this.notes.unshift(val);
      });
  }
}
