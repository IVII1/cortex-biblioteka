import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'customDate',
  standalone: true,
})
export class CustomDatePipe implements PipeTransform {
  transform(apiDate: string): string {
    const currentDateTime = DateTime.fromSQL(apiDate);
    const formattedDate = currentDateTime.toFormat('dd/MM/yyyy');
    return formattedDate;
  }
}
