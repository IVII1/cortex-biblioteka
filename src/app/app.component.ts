import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, ResolveStart, Router } from '@angular/router';
import { GlobalService } from './@shared/services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly globalService = inject(GlobalService);

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (
        event instanceof ResolveStart &&
        this.globalService.is404.value === true
      ) {
        this.globalService.is404.next(false);
      }

      if (event instanceof NavigationEnd) {
        if (this.globalService.isDenied.value === true) {
          this.globalService.isDenied.next(false);
        }
      }
    });
  }
}
