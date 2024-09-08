import { Component, OnInit } from '@angular/core';
import { Librarian } from '../../models/librarian.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-librarian-detail',
  templateUrl: './librarian-detail.component.html',
  styleUrl: './librarian-detail.component.scss',
})
export class LibrarianDetailComponent implements OnInit {
  librarian!: Librarian;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.librarian = this.route.snapshot.data['librarian'];
  }
}
