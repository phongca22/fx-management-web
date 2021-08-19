import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Type } from './type.enum';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { type: Type; message: string }) {}

  ngOnInit(): void {}
}
