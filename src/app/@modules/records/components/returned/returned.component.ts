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
  constructor(
    private recordsService: RecordsService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.recordsService.allData().subscribe({
      next: (res) => {
        this.returnEvents = res.data.vracene;
      },
    });
  }
}
