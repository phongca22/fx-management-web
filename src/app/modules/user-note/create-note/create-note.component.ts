import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInfo } from 'src/app/core/user-info';
import { Transporter } from 'src/app/core/transporter';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../../alert/alert.service';
import { AddNoteComponent } from '../add-note/add-note.component';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {
  loading: boolean;
  form: FormGroup;
  @ViewChild('wrapper') wrapper: ElementRef;
  height: number;
  transporters: Transporter[];

  constructor(
    private service: NoteService,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo,
    private alert: AlertService,
    private dialog: MatDialogRef<AddNoteComponent>,
    private builder: FormBuilder,
    private user: UserService
  ) {
    this.setupForm();
  }

  ngOnInit(): void {
    this.user.getTransporters().subscribe((data: Transporter[]) => (this.transporters = data));
  }

  setupForm(): void {
    this.form = this.builder.group({
      date: [null, Validators.required],
      content: ['', Validators.required],
      transporter: [null, Validators.required]
    });
  }

  save(): void {
    this.loading = true;
    const { date, content, transporter } = this.form.value;
    const format = content
      .split(/\n/g)
      .map((line: string) => `<span>${line}</span>`)
      .join('<br/>');
    this.service
      .createNoteForTransporter(this.data.id, {
        content: format,
        date: date,
        transporterId: transporter.info.id
      })
      .subscribe((res: Response) => {
        if (res.ok) {
          this.service.refresh();
          this.dialog.close();
          this.alert.success('addNote.success');
        } else {
          this.loading = false;
          this.alert.error();
        }
      });
  }
}
