
import {Pipe, PipeTransform} from '@angular/core';
import {DateTime} from 'luxon';

@Pipe({
    name: 'Date',
    standalone: false
})
export class DatePipe implements PipeTransform {
    transform(value: string | Date | DateTime, ...args: string[]): unknown {
      if (!value) {
        return value;
      }
      let jsDate: Date;
      if (DateTime.isDateTime(value)) {
        jsDate = value.toJSDate();
      } else if (value instanceof Date) {
        jsDate = value;
      } else {
        jsDate = new Date(value as string);
      }
      const date = DateTime.fromJSDate(jsDate);

      if (args.length > 0) {
        return date.toFormat(args[0]);
      }
      return date.toLocaleString();
    }
}
