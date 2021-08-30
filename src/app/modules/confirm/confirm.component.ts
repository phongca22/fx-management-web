import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title?: string;
  message: string;
}
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private dialog: MatDialogRef<ConfirmComponent>) {}

  ngOnInit(): void {}

  ok(): void {
    this.dialog.close(true);
  }
}
