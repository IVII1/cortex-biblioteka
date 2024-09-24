/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { BorrowData } from '../models/borrow-data.model';
import { ReservationData } from '../models/reservation-data.model';

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  httpClient = inject(HttpClient);

  allBorrowData() {
    const url = environment.apiRecordsBorrow;
    const headers = new HttpHeaders().set('Authorization', environment.token);
    return this.httpClient.get<{ data: BorrowData }>(url, { headers });
  }

  allReservationData() {
    const url = environment.apiBooksReserve;
    const headers = new HttpHeaders().set('Authorization', environment.token);
    return this.httpClient.get<{ data: ReservationData }>(url, { headers });
  }
  cancelReservation(data: any) {
    const url = environment.apiBooksCancelReservation;
    const headers = new HttpHeaders().set('Authorization', environment.token);
    return this.httpClient.post(url, data, { headers });
  }
}
