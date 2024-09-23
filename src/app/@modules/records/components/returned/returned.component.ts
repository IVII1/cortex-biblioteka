import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecordsData } from '../../models/records-data.model';
import { RecordsService } from '../../services/records.service';

@Component({
  selector: 'app-returned',
  templateUrl: './returned.component.html',
  styleUrl: './returned.component.scss',
})
export class ReturnedComponent {
  returnEvents!: RecordsData[];
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
    this.recordsService.allData().subscribe({
      next: (res) => {
        this.returnEvents = res.data.vracene;
        this.isLoading = false;
      },
    });
  }
}
