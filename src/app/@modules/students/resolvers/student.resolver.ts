/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { StudentService } from '../services/student.service';

import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentResolver implements Resolve<Student> {
  constructor(private studentService: StudentService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Student> {
    const studentId = route.paramMap.get('id');
    return this.studentService.getStudent(studentId!);
  }
}
