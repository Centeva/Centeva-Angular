import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  public transform(array: any, toReverse: boolean) {
    if (toReverse) {
      return array.reverse();
    } else {
      return array;
    }
  }
}
