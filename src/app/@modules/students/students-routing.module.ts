import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './components/students/students.component';
import { StudentEditAddComponent } from './components/student-edit-add/student-edit-add.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';

const routes: Routes = [
  { path: '', component: StudentsComponent },
  { path: 'edit/:id', component: StudentEditAddComponent },
  { path: 'new', component: StudentEditAddComponent },
  { path: ':id', component: StudentDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
