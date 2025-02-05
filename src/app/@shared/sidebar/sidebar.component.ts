import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public isAdmin = false;
  public isExpanded = false;

  expandSidebar() {
    this.isExpanded = !this.isExpanded;
  }
}
