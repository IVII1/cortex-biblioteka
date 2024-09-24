import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'expirationDate',
  standalone: true,
})
export class ExpirationDatePipe implements PipeTransform {
  transform(apiDate: string): string {
    const expirationDate = DateTime.fromSQL(apiDate).plus({ days: 20 });
    const formattedDate = expirationDate.toFormat('dd/MM/yyyy');
    return formattedDate;
  }
}
