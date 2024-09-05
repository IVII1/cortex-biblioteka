import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './components/students/students.component';
import { StudentEditAddComponent } from './components/student-edit-add/student-edit-add.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { StudentResolver } from './resolvers/student.resolver';

const routes: Routes = [
  { path: '', component: StudentsComponent },
  {
    path: 'edit/:id',
    component: StudentEditAddComponent,
    resolve: { student: StudentResolver },
  },
  { path: 'new', component: StudentEditAddComponent },
  {
    path: ':id',
    component: StudentDetailComponent,
    resolve: { student: StudentResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
