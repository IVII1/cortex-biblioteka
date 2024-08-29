import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isSearchFormVisible = false;
  showInfo = false;
  showResults = false;
  showFilters = false;

  // Filters state
  filters = {
    knjige: true,
    autori: true,
    ucenici: true,
    bibliotekari: true,
  };

  user = {
    photoPath: 'path_to_user_photo',
  };

  toggleSearchForm() {
    this.isSearchFormVisible = !this.isSearchFormVisible;
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  toggleFilter(filterName: string) {
    // this.filters[filterName] = !this.filters[filterName];
  }

  onSearchSubmit() {
    // Handle search form submission
  }
}
