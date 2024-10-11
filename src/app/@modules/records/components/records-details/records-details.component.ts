import { Component, OnInit } from '@angular/core';
import { RecordType } from '../../models/record-type';
import { RecordsData } from '../../models/records-data.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BorrowData } from '../../models/borrow-data.model';
import { RecordsService } from '../../services/records.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-records-details',
  templateUrl: './records-details.component.html',
  styleUrls: ['./records-details.component.scss'],
})
export class RecordsDetailsComponent implements OnInit {
  recordType!: RecordType;
  records!: RecordsData[];
  currentRecord!: RecordsData | null;
  isLoading!: boolean;

  constructor(
    private route: ActivatedRoute,
    private recordsService: RecordsService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.recordType = params['type'] as RecordType;

      this.loadRecords(id);
    });
  }

  loadRecords(id: number) {
    this.isLoading = true;
    this.recordsService.allBorrowData().subscribe({
      next: (response: { data: BorrowData }) => {
        switch (this.recordType) {
          case RecordType.BORROW:
            this.records = response.data.izdate;
            break;
          case RecordType.RETURN:
            this.records = response.data.vracene;
            break;
          case RecordType.OVERDTAFT:
            this.records = response.data.prekoracene;
            break;
          default:
        }

        this.currentRecord =
          this.records.find((record) => record.id === id) || null;
        this.isLoading = false;
      },
    });
  }
  openMenuId: number | null = null;

  toggleMenu(recordId: number) {
    if (this.openMenuId === recordId) {
      this.openMenuId = null;
    } else {
      this.openMenuId = recordId;
    }
  }
}
