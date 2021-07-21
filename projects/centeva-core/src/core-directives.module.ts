import {NgModule} from '@angular/core';
import {PhoneValidator} from './directives/phone.validator';
import {EmailValidator} from './directives/email.validator';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { NumberInputDirective } from './directives/number-input.directive';
import { TableResizerDirective } from './directives/table-resizer.directive';
import { ThResizableDirective } from './directives/th-resizable.directive';


@NgModule({
  declarations: [
    EmailValidator,
    PhoneValidator,
    ClickOutsideDirective,
    NumberInputDirective,
    TableResizerDirective,
    ThResizableDirective,
  ],
  exports: [
    EmailValidator,
    PhoneValidator,
    ClickOutsideDirective,
    NumberInputDirective,
    TableResizerDirective,
    ThResizableDirective,
  ],
})
export class CoreDirectivesModule {
}
