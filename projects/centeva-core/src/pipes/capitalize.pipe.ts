import {Pipe, PipeTransform} from '@angular/core';
import { lowerCase, startCase } from 'lodash-es';

@Pipe({
    name: 'capitalize',
    standalone: false
})
export class CapitalizePipe implements PipeTransform {
  public transform(value: string, args?: any) {
    return startCase(lowerCase(value));
  }
}
