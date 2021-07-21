import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({ name: 'phoneNumber' })
export class PhoneNumberPipe implements PipeTransform  {
  public transform(value: string, args?: any) {
    const cleaned = ('' + value).replace(/\D/g, '');
    if (cleaned.length === 10) {
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        return (!match) ? cleaned : '(' + match[1] + ')' + match[2] + '-' + match[3];
    } else if (cleaned.length === 7) {
        const match = cleaned.match(/^(\d{3})(\d{4})$/);
        return (!match) ? cleaned : match[1] + '-' + match[2];
    } else if (cleaned.length === 11) {
        const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
        return (!match) ? cleaned : match[1] + '(' + match[2] + ')' + match[3] + '-' + match[4];
    } else {
        return cleaned;
    }
  }
}
