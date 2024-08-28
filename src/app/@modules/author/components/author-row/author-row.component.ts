import { Component, input } from '@angular/core';
import { Author } from '../../author.model';

@Component({
  selector: 'app-author-row',
  templateUrl: './author-row.component.html',
  styleUrls: ['./author-row.component.scss'],
})
export class AuthorRowComponent {
  author = input<Author>();
}
