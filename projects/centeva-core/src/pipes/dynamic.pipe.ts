import { Injector, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dynamic',
    standalone: false
})
export class DynamicPipe implements PipeTransform {

  public constructor(private injector: Injector) {
  }

  transform(value: any, pipeToken: PipeTransform, pipeArgs: any[]): any {
    if (!pipeToken && !value) {
      return value;
    }
    if (!pipeToken) {
        return value;
    }
    else {
        return pipeToken.transform(value, pipeArgs);
    }
  }
}
