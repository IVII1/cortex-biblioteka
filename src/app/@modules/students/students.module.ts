import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentEditAddComponent } from './components/student-edit-add/student-edit-add.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StudentEditAddComponent, StudentDetailComponent],
  imports: [CommonModule, StudentsRoutingModule, ReactiveFormsModule],
})
export class StudentsModule {}
