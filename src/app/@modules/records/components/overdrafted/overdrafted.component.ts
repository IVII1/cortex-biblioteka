import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecordsData } from '../../models/records-data.model';
import { RecordsService } from '../../services/records.service';

@Component({
  selector: 'app-overdrafted',
  templateUrl: './overdrafted.component.html',
  styleUrl: './overdrafted.component.scss',
})
export class OverdraftedComponent implements OnInit {
  overdraftEvents!: RecordsData[];
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
    this.recordsService.allBorrowData().subscribe({
      next: (res) => {
        this.overdraftEvents = res.data.prekoracene;
        this.isLoading = false;
      },
    });
  }
}
