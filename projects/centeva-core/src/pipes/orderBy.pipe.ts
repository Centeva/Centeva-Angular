import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'lodash';

@Pipe({ name: 'orderBy' })
export class OrderByPipe implements PipeTransform  {
  public transform(array: any[], args?: any) {
    if (args) {
      return _.sortBy(array, args);
    } else {
      return _.sortBy(array);
    }
  }
}
