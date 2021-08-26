import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PipeModule } from '../pipes/pipe.module';
import { SharedModule } from '../shared-module';
import { AddNoteComponent } from './add-note/add-note.component';
import { UserNoteComponent } from './user-note.component';

@NgModule({
  declarations: [UserNoteComponent, AddNoteComponent],
  imports: [CommonModule, SharedModule, TranslateModule.forChild({}), ReactiveFormsModule, PipeModule],
  exports: [UserNoteComponent]
})
export class UserNoteModule {}
