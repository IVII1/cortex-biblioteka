import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordsRoutingModule } from './records-routing.module';
import { BorrowedComponent } from './components/borrowed/borrowed.component';
import { PageHeaderComponent } from '../../@shared/page-header/page-header.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ReturnedComponent } from './components/returned/returned.component';
import { OverdraftedComponent } from './components/overdrafted/overdrafted.component';
import { ActiveReservationsComponent } from './components/active-reservations/active-reservations.component';
import { ArchivedReservationsComponent } from './components/archived-reservations/archived-reservations.component';
import { RecordsSidebarComponent } from '../../@shared/records-sidebar/records-sidebar.component';
import { RecordsDetailsComponent } from './components/records-details/records-details.component';

@NgModule({
  declarations: [
    BorrowedComponent,
    ReturnedComponent,
    OverdraftedComponent,
    ActiveReservationsComponent,
    ArchivedReservationsComponent,
    RecordsDetailsComponent,
  ],
  imports: [
    CommonModule,
    RecordsRoutingModule,
    PageHeaderComponent,

    MatListModule,
    MatIconModule,
    RecordsSidebarComponent,
  ],
})
export class RecordsModule {}
