/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveEnd,
} from '@angular/router';
import { Observable } from 'rxjs';

import { StudentService } from '../services/student.service';
import { Librarian } from '../../librarians/models/librarian.model';

@Injectable({
  providedIn: 'root',
})
export class StudentResolver implements Resolve<Librarian> {
  constructor(private studentService: StudentService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Librarian> {
    const studentId = route.paramMap.get('id');
    return this.studentService.getStudent(studentId!);
  }
}
