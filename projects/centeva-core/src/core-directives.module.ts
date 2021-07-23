import {NgModule} from '@angular/core';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { NumberInputDirective } from './directives/number-input.directive';
import { TableResizerDirective } from './directives/table-resizer.directive';
import { ThResizableDirective } from './directives/th-resizable.directive';


@NgModule({
  declarations: [
    ClickOutsideDirective,
    NumberInputDirective,
    TableResizerDirective,
    ThResizableDirective,
  ],
  exports: [
    ClickOutsideDirective,
    NumberInputDirective,
    TableResizerDirective,
    ThResizableDirective,
  ],
})
export class CoreDirectivesModule {
}
