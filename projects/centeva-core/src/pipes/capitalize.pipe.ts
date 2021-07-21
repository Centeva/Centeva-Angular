import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {
  public transform(value: string, args?: any) {
    return _.startCase(_.lowerCase(value));
  }
}
