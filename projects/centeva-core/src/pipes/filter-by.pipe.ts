import { Pipe, PipeTransform } from '@angular/core';
/*
  EXAMPLE USAGE::
  <div *ngFor="let report of allReports | filterBy: {'Name': 'my name', 'Description':'my description'}" >
  Will preform and AND search. Meaning all conditions must be met.
*/
@Pipe({
    name: 'filterBy',
    standalone: false
})
export class FilterByPipe implements PipeTransform {

  transform(value: any [], ...args: any[]): any[] {
    if (!value || !args) return value;
    const argsDict = args?.length > 0 ? args[0] : {};
    const keys = args?.length > 0 ? Object.keys(args[0]) : [];
    value = value.filter(x => {
      let valid = true;
      keys.forEach(k => {
        if(!x[k] || x[k].toString().toLocaleLowerCase().indexOf(argsDict[k].toString().toLocaleLowerCase()) === -1) {
          valid = false;
        }
      })      
      return valid;
    });
    return value;
  }

}
