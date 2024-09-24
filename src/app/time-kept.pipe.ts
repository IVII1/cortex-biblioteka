import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'timeKept',
  standalone: true,
})
export class TimeKeptPipe implements PipeTransform {
  transform(apiDate: string): string {
    const startDate = DateTime.fromSQL(apiDate);
    const currentDate = DateTime.now();
    const totalTime = currentDate.diff(startDate, ['weeks', 'days']);
    return `nedelja: ${totalTime.weeks}, dana: ${Math.floor(totalTime.days)}`;
  }
}
