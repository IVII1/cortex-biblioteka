import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public is404: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isDenied: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}
}
