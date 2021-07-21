import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({ name: 'celsiusToFahrenheit' })
export class CelsiusToFahrenheitPipe implements PipeTransform  {
  public transform(value: number, args?: any) {
    return _.round(value * 1.8 + 32, 1);
  }
}
