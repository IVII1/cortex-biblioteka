import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecordsData } from '../../models/records-data.model';
import { RecordsService } from '../../services/records.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-archived-reservations',
  templateUrl: './archived-reservations.component.html',
  styleUrl: './archived-reservations.component.scss',
})
export class ArchivedReservationsComponent implements OnInit {
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
        this.reservations = res.data.archive;
        this.isLoading = false;
      },
    });
  }
  borrowBook(studentId: number, bookId: number) {
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
      this.httpClient.post(url, data, { headers }).subscribe({
        next: () => {
          this.fetchData();
        },
      });
    }
  }
}
