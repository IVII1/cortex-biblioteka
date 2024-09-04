import { Component, OnInit } from '@angular/core';
import { Author } from '../../models/author.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss'],
})
export class AuthorDetailComponent implements OnInit {
  author!: Author;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.author = this.route.snapshot.data['author'];
    console.log(this.author);
  }
}
