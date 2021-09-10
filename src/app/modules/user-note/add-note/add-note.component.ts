import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Response } from 'src/app/core/response';
import { UserInfo } from 'src/app/core/user-info';
import { UserNote } from 'src/app/core/user-note';
import { AlertService } from '../../alert/alert.service';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit, AfterViewInit {
  loading: boolean;
  contentCtrl: FormControl;
  @ViewChild('wrapper') wrapper: ElementRef;
  height: number;

  constructor(
    private service: NoteService,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo,
    private alert: AlertService,
    private dialog: MatDialogRef<AddNoteComponent>,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    const t = this.wrapper.nativeElement.getBoundingClientRect().height;
    this.height = t - 100;
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.contentCtrl = new FormControl('', Validators.required);
  }

  save(): void {
    this.loading = true;
    const format = this.contentCtrl.value
      .split(/\n/g)
      .map((line: string) => `<span>${line}</span>`)
      .join('<br/>');
    this.service.addNote(this.data.id, format).subscribe((res: Response) => {
      if (res.ok) {
        this.service.refreshEvent.next();
        this.dialog.close();
        this.alert.success('addNote.success');
      } else {
        this.loading = false;
        this.alert.error();
      }
    });
  }
}
