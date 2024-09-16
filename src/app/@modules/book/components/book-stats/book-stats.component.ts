import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-stats',
  standalone: true,
  imports: [],
  templateUrl: './book-stats.component.html',
  styleUrl: './book-stats.component.scss',
})
export class BookStatsComponent implements OnInit {
  book!: Book;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.book = this.route.snapshot.data['book'];
  }
}
