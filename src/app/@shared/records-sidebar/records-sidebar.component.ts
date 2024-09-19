import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem, MatNavList } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-records-sidebar',
  standalone: true,
  imports: [MatIcon, RouterModule, MatList, MatNavList, MatListItem],
  templateUrl: './records-sidebar.component.html',
  styleUrl: './records-sidebar.component.scss',
})
export class RecordsSidebarComponent {}
