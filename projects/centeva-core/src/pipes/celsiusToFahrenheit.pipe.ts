import { Pipe, PipeTransform } from '@angular/core';
import { round } from 'lodash-es';

@Pipe({
    name: 'celsiusToFahrenheit',
    standalone: false
})
export class CelsiusToFahrenheitPipe implements PipeTransform  {
  public transform(value: number, args?: any) {
    return round(value * 1.8 + 32, 1);
  }
}
