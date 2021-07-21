
import {Pipe, PipeTransform} from '@angular/core';

const CommonFileTypes: any = {
  'application/vnd.ms-excel': 'icon-file-xls',
  'application/pdf': 'icon-file-pdf',
  'image/png': 'icon-file-png',
  'text/plain': 'icon-file-txt',
  'text/csv': 'icon-file-csv',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'icon-file-doc',
  'image/jpeg': 'icon-file-jpg',
  'text/html': 'icon-file-html',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'icon-file-xls',
  'text/x-vcard': 'icon-file-txt',
  'text/comma-separated-values': 'icon-file-csv',
};

@Pipe({name: 'fileType'})
export class FileTypePipe implements PipeTransform {
  public transform(value: any, args?: any): any {
    if (!value) {
      return '';
    } else if (CommonFileTypes[value]) {
      return CommonFileTypes[value];
    } else if (value.indexOf('image/') === 0) {
      return 'icon-file-jpg';
    } else if (value.indexOf('text/') === 0) {
      return 'icon-file-txt';
    } else if (value.indexOf('application/') === 0) {
      return 'icon-file-doc';
    } else {
      return 'icon-file-doc';
    }
  }
}
