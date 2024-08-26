import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IssuedComponent } from './components/issued/issued.component';

const routes: Routes = [
  {
    path: 'issued',
    component: IssuedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordsRoutingModule {}
