import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'capitalize',
    standalone: false
})
export class CapitalizePipe implements PipeTransform {
  public transform(value: string, args?: any) {
    return _.startCase(_.lowerCase(value));
  }
}
