
import {Pipe, PipeTransform} from '@angular/core';
import {DateTime} from 'luxon';
import * as moment from 'moment';

@Pipe({
    name: 'Date',
    standalone: false
})
export class DatePipe implements PipeTransform {
    transform(value: moment.Moment | string | Date | DateTime, ...args: string[]): unknown {
      if (!value) {
        return value;
      }
      const jsDate = moment.isMoment(value) ? value.toDate() : DateTime.isDateTime(value) ? value.toJSDate() : new Date(value);
      const date = DateTime.fromJSDate(jsDate);

      if (args.length > 0) {
        return date.toFormat(args[0]);
      }
      return date.toLocaleString();
    }
}
