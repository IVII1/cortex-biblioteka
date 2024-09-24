import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecordsData } from '../../models/records-data.model';
import { RecordsService } from '../../services/records.service';

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
}
