import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserNoteComponent } from './user-note.component';
import { SharedModule } from '../shared-module';
import { TranslateModule } from '@ngx-translate/core';
import { AddNoteComponent } from './add-note/add-note.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserNoteComponent, AddNoteComponent],
  imports: [CommonModule, SharedModule, TranslateModule.forChild({}), ReactiveFormsModule],
  exports: [UserNoteComponent, AddNoteComponent]
})
export class UserNoteModule {}
