
import {Pipe, PipeTransform} from '@angular/core';
import {DateTime} from 'luxon';

@Pipe({name: 'Date'})
export class DatePipe implements PipeTransform {
  public transform(value: any, args?: any): any {
    if (args) {
      return DateTime.fromISO(value).toFormat(args);
    } else {
      return DateTime.fromISO(value).toFormat('yyyy-MM-dd');
    }
  }
}
