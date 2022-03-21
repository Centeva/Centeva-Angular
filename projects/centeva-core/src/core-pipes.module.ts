import {NgModule} from '@angular/core';
import {CapitalizePipe} from './pipes/capitalize.pipe';
import {DatePipe} from './pipes/date.pipe';
import {OrderByPipe} from './pipes/orderBy.pipe';
import {PercentagePipe} from './pipes/percentage.pipe';
import {MiddleDotPipe} from './pipes/middleDot.pipe';
import {HighlightPipe} from './pipes/highlight.pipe';
import {CelsiusToFahrenheitPipe} from './pipes/celsiusToFahrenheit.pipe';
import { PhoneNumberPipe } from './pipes/phoneNumber.pipe';
import { DynamicPipe } from './pipes/dynamic.pipe';
import { ReversePipe } from './pipes/reverse.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { FilterByPipe } from './pipes/filter-by.pipe';
import { FilterByOrPipe } from './pipes/filter-by-or.pipe';

@NgModule({
  declarations: [
    CapitalizePipe,
    DatePipe,
    OrderByPipe,
    PercentagePipe,
    CelsiusToFahrenheitPipe,
    MiddleDotPipe,
    HighlightPipe,
    PhoneNumberPipe,
    DynamicPipe,
    ReversePipe,
    SafeHtmlPipe,
    FilterByPipe,
    FilterByOrPipe
  ],
  exports: [
    CapitalizePipe,
    DatePipe,
    OrderByPipe,
    PercentagePipe,
    CelsiusToFahrenheitPipe,
    MiddleDotPipe,
    HighlightPipe,
    PhoneNumberPipe,
    DynamicPipe,
    ReversePipe,
    SafeHtmlPipe,
    FilterByPipe,
    FilterByOrPipe
  ],
})
export class CorePipesModule {
}
