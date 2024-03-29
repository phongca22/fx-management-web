import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import { chain, find as findLodash, groupBy, isEmpty, keys } from 'lodash';
import { filter, takeUntil } from 'rxjs/operators';
import { Doctor } from 'src/app/core/doctor';
import { PATIENT_NOTE_TYPE } from 'src/app/core/patient-note-type';
import { Response } from 'src/app/core/response';
import { Role } from 'src/app/core/role';
import { UserNote } from 'src/app/core/user-note';
import { DestroyService } from 'src/app/services/destroy.service';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../auth/auth.service';
import { TransporterCreateComponent } from '../transporter-picker/transporter-create/transporter-create.component';
import { TransporterPickerComponent } from '../transporter-picker/transporter-picker.component';
import { SupportStatusUpdateComponent } from '../user-support/support-status-update/support-status-update.component';
import { NoteService } from './note.service';

dayjs.extend(customParseFormat);

@Component({
  selector: 'app-user-note',
  templateUrl: './user-note.component.html',
  styleUrls: ['./user-note.component.scss'],
  providers: [DestroyService]
})
export class UserNoteComponent implements OnInit {
  @Input() data: number;
  @Input() code: string | undefined;
  @Input() notes: UserNote[];
  @Output() notesChange = new EventEmitter<UserNote[]>();
  loaded: boolean;
  groups: { id: number; name: string; notes: UserNote[] }[];
  isAgent: boolean;
  isDoctor: boolean;
  isTransporter: boolean;
  isCoordinator: boolean;
  doctors: Doctor[];

  constructor(
    private service: NoteService,
    private readonly $destroy: DestroyService,
    private alert: AlertService,
    public auth: AuthService,
    private dialog: MatDialog
  ) {
    this.isAgent = this.auth.hasRole(Role.Agent);
    this.isDoctor = this.auth.hasRole(Role.Doctor);
    this.isTransporter = this.auth.hasRole(Role.Volunteer);
    this.isCoordinator = this.auth.hasRole(Role.Coordinator);
    this.service
      .listenRefresh()
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => this.getData());
  }

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
          this.doctors = res.data.doctors.map((val: any) => new Doctor(val));
          this.notes = res.data.result
            .map((val: any) => new UserNote(val))
            .map((val: UserNote) => {
              if (val.type === PATIENT_NOTE_TYPE.DOCTOR_CHANGE) {
                val.contents = val.contents.map(
                  (doctorId: string) =>
                    (findLodash(this.doctors, { info: { id: parseInt(doctorId) } }) as Doctor)?.info.name
                );
              }
              return val;
            });

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

  showTransporterPicker(data: UserNote): void {
    this.dialog
      .open(TransporterPickerComponent, {
        data: {
          id: this.data,
          psId: data.patientSupport.id
        },
        width: '100%',
        maxWidth: '96vw',
        autoFocus: false
      })
      .afterClosed()
      .pipe(filter((val: boolean) => val))
      .subscribe(() => this.getData());
  }

  showTransporterCreate(data: UserNote): void {
    this.dialog
      .open(TransporterCreateComponent, {
        data: {
          id: this.data,
          patientSupport: data.patientSupport
        },
        width: '100%',
        maxWidth: '96vw',
        autoFocus: false
      })
      .afterClosed()
      .pipe(filter((val: boolean) => val))
      .subscribe(() => this.getData());
  }

  updateStatus(data: UserNote): void {
    this.dialog
      .open(SupportStatusUpdateComponent, {
        data: {
          id: this.data,
          psId: data.patientSupport.id
        },
        width: '100%',
        maxWidth: '96vw',
        autoFocus: false
      })
      .afterClosed()
      .pipe(filter((val: boolean) => val))
      .subscribe(() => this.getData());
  }
}
