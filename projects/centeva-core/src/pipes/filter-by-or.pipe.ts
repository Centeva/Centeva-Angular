import { Pipe, PipeTransform } from '@angular/core';
/*
  EXAMPLE USAGE::
  <div *ngFor="let report of allReports | filterBy: {'Name': 'my name', 'Description':'my description'}" >
  Will preform and OR search. Meaning any condition will work.
*/
@Pipe({
  name: 'filterByOr'
})
export class FilterByOrPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any[] {
    if (!value || !args) return value;
    const argsDict = args?.length > 0 ? args[0] : {};
    const keys = args?.length > 0 ? Object.keys(args[0]) : [];
    value = value.filter(x => {
      let valid = false;
      keys.forEach(k => {
        if(x[k] && x[k].toString().toLocaleLowerCase().indexOf(argsDict[k].toString().toLocaleLowerCase()) !== -1) {
          valid = true;
        }
      })      
      return valid;
    });
    return value;
  }
}
