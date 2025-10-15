import {Validator, NG_VALIDATORS} from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import {Directive} from '@angular/core';
import {Utils} from '../common/utils/utils';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[validPhone][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: PhoneValidator, multi: true },
    ],
    standalone: false
})
export class PhoneValidator implements Validator {
  public static Validate(c: AbstractControl) {
    if (!c.value || Utils.IsValidPhoneNumber(c.value)) {
      return null;
    } else {
      return {
        validPhone: {
          valid: false,
        },
      };
    }
  }
  public validate(c: AbstractControl) {
    return PhoneValidator.Validate(c);
  }
}
