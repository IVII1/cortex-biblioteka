import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

import { BorrowData } from '../models/borrow-data.model';

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  httpClient = inject(HttpClient);

  allData() {
    const url = environment.apiRecordsBorrow;
    const headers = new HttpHeaders().set('Authorization', environment.token);
    return this.httpClient.get<{ data: BorrowData }>(url, { headers });
  }
}
