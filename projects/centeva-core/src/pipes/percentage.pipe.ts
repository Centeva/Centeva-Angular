import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'percentage',
    standalone: false
})
export class PercentagePipe implements PipeTransform  {
  public transform(value: number, args?: any) {
    return _.round(value * 100, 0);
  }
}
