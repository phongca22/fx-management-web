import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter, find, isNil } from 'lodash';
import { Support } from 'src/app/core/support';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-support-picker',
  templateUrl: './support-picker.component.html',
  styleUrls: ['./support-picker.component.scss']
})
export class SupportPickerComponent implements OnInit {
  form: FormGroup;
  supports: Support[];

  constructor(
    private service: ConfigService,
    private builder: FormBuilder,
    private dialog: MatDialogRef<SupportPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Support[]
  ) {
    this.supports = this.service.supports;
  }

  ngOnInit(): void {
    this.setupForm();
  }

  get list() {
    return this.form.controls['list'] as FormArray;
  }

  setupForm(): void {
    this.form = this.builder.group({
      list: this.builder.array([])
    });

    this.supports.map((val: Support) => {
      const f = this.builder.group({
        id: [val.id],
        value: [!isNil(find(this.data, { id: val.id }))],
        name: [val.name]
      });

      this.list.push(f);
    });
  }

  save() {
    this.dialog.close(filter(this.form.get('list')?.value, ['value', true]));
  }
}
