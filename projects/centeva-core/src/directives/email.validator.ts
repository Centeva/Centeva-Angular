import {Validator, NG_VALIDATORS} from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import {Directive} from '@angular/core';
import {Utils} from '../common/utils/utils';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[validEmail][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EmailValidator, multi: true },
  ],
})
export class EmailValidator implements Validator {
  public static Validate(c: AbstractControl) {
    if (!c.value || Utils.IsValidEmail(c.value)) {
      return null;
    } else {
      return {
        validEmail: {
          valid: false,
        },
      };
    }
  }
  public validate(c: AbstractControl) {
    return EmailValidator.Validate(c);
  }
}
