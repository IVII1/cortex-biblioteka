import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordsRoutingModule } from './records-routing.module';
import { IssuedComponent } from './components/issued/issued.component';
import { RecordsComponent } from './components/records/records.component';

@NgModule({
  declarations: [IssuedComponent, RecordsComponent],
  imports: [CommonModule, RecordsRoutingModule],
})
export class RecordsModule {}
