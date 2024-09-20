import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BorrowedComponent } from './components/borrowed/borrowed.component';
import { ReturnedComponent } from './components/returned/returned.component';
import { OverdraftedComponent } from './components/overdrafted/overdrafted.component';
import { ActiveReservationsComponent } from './components/active-reservations/active-reservations.component';
import { ArchivedReservationsComponent } from './components/archived-reservations/archived-reservations.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'borrowed',
    pathMatch: 'full',
  },
  {
    path: 'borrowed',
    component: BorrowedComponent,
  },
  {
    path: 'returned',
    component: ReturnedComponent,
  },
  {
    path: 'overdrafted',
    component: OverdraftedComponent,
  },
  {
    path: 'reservations-active',
    component: ActiveReservationsComponent,
  },
  {
    path: 'reservations-archived',
    component: ArchivedReservationsComponent,
  },
  {
    path: '**',
    redirectTo: 'borrowed',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordsRoutingModule {}
