import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [],
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent {
  title = input<string>();
}
