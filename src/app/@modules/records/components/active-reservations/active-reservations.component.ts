import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecordsData } from '../../models/records-data.model';
import { RecordsService } from '../../services/records.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DateTime } from 'luxon';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-active-reservations',
  templateUrl: './active-reservations.component.html',
  styleUrl: './active-reservations.component.scss',
})
export class ActiveReservationsComponent implements OnInit {
  reservations!: RecordsData[];
  isLoading!: boolean;

  constructor(
    private recordsService: RecordsService,
    private router: Router,
    private httpClient: HttpClient,
  ) {}
  ngOnInit(): void {
    this.fetchData();
  }
  openMenuId: number | null = null;

  toggleMenu(bookId: number) {
    if (this.openMenuId === bookId) {
      this.openMenuId = null;
    } else {
      this.openMenuId = bookId;
    }
  }
  fetchData() {
    this.isLoading = true;
    this.recordsService.allReservationData().subscribe({
      next: (res) => {
        this.reservations = res.data.active;
        this.isLoading = false;
      },
    });
  }

  cancelReservation(id: number) {
    this.recordsService.cancelReservation({ reservation_id: id }).subscribe({
      next: () => {
        this.fetchData();
      },
    });
  }

  borrowBook(reservationId: number, studentId: number, bookId: number) {
    {
      const url = `${environment.apiBooks}/${bookId}/izdaj`;
      const headers = new HttpHeaders().set(
        'Authorization',
        `${environment.token}`,
      );
      const formattedActionDate = DateTime.now().toFormat('MM/dd/yyyy');
      const fromattedReturnDate = DateTime.now()
        .plus({ days: 20 })
        .toFormat('MM/dd/yyyy');
      const data = {
        student_id: studentId,
        datumIzdavanja: formattedActionDate,
        datumVracanja: fromattedReturnDate,
      };
      this.httpClient.post(url, data, { headers }).subscribe();
    }
    this.recordsService
      .cancelReservation({ reservation_id: reservationId })
      .subscribe({
        next: () => {
          this.fetchData();
        },
      });
  }
}
