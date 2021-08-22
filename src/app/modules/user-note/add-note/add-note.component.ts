import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../../alert/alert.service';

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
    private service: UserService,
    @Inject(MAT_DIALOG_DATA) public data: number,
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
    this.service.addNote(this.data, this.contentCtrl.value).subscribe((res: Response) => {
      this.loading = false;
      if (res.ok) {
        this.dialog.close();
        this.alert.success('addNote.success');
      } else {
        this.alert.error();
      }
    });
  }
}
