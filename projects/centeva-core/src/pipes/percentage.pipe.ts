import { Pipe, PipeTransform } from '@angular/core';
import { round } from 'lodash-es';

@Pipe({
    name: 'percentage',
    standalone: false
})
export class PercentagePipe implements PipeTransform  {
  public transform(value: number, args?: any) {
    return round(value * 100, 0);
  }
}
