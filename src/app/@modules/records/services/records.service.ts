/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
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

    return this.httpClient.get<{ data: BorrowData }>(url);
  }

  allReservationData() {
    const url = environment.apiBooksReserve;

    return this.httpClient.get<{ data: ReservationData }>(url);
  }
  cancelReservation(data: any) {
    const url = environment.apiBooksCancelReservation;

    return this.httpClient.post(url, data);
  }
}
