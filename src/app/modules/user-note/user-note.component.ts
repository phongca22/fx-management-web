import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isEmpty } from 'lodash';
import { takeUntil } from 'rxjs/operators';
import { Response } from 'src/app/core/response';
import { UserNote } from 'src/app/core/user-note';
import { DestroyService } from 'src/app/services/destroy.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-user-note',
  templateUrl: './user-note.component.html',
  styleUrls: ['./user-note.component.scss'],
  providers: [DestroyService]
})
export class UserNoteComponent implements OnInit {
  notes: UserNote[];
  loaded: boolean;

  constructor(
    private service: UserService,
    private readonly $destroy: DestroyService,
    private alert: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service
      .getNotes(this.data)
      .pipe(takeUntil(this.$destroy))
      .subscribe((res: Response) => {
        this.loaded = true;
        if (res.ok) {
          this.notes = res.data.map((val: any) => new UserNote(val));
        } else {
          this.alert.error();
        }
      });
  }

  isEmpty(): boolean {
    return this.loaded && isEmpty(this.notes);
  }
}
