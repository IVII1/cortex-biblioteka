import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../../services/records.service';
import { RecordsData } from '../../models/records-data.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-records',
  templateUrl: './borrowed.component.html',
  styleUrls: ['./borrowed.component.scss'],
})
export class BorrowedComponent implements OnInit {
  borrows!: RecordsData[];
  constructor(
    private recordsService: RecordsService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.router.navigate(['/records/borrowed']);
    this.recordsService.allData().subscribe({
      next: (res) => {
        this.borrows = res.data.izdate;
      },
    });
  }
}
