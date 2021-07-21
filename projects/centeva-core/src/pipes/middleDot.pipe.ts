import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'middleDot'})
export class MiddleDotPipe implements PipeTransform {
  public transform(value: any, n: number): any {
    let str = value;
    for (let i = 0; i < n; i++) {
      str = '∙' + str;
    }

    return str;
  }
}
