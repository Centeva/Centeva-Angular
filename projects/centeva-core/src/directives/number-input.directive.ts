import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { KeyboardKeys } from '../common/constants/KeyboardKeys';


@Directive({
    selector: '[numberInput]',
    standalone: false
})
export class NumberInputDirective {

  public numberRegex = '^[0-9]*$';
  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    const e = <KeyboardEvent> event;
    if ([ KeyboardKeys.BACKSPACE.toString(),
          KeyboardKeys.TAB.toString(),
          KeyboardKeys.DELETE.toString(),
          KeyboardKeys.ESCAPE.toString(),
          KeyboardKeys.ENTER.toString()].includes(e.key) ||
      // Allow: Ctrl+A
      (e.key === KeyboardKeys.KEY_A.toString() && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (e.key === KeyboardKeys.KEY_C.toString() && e.ctrlKey === true) ||
      // Allow: Ctrl+V
      (e.key === KeyboardKeys.KEY_V.toString() && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (e.key === KeyboardKeys.KEY_X.toString() && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.key === KeyboardKeys.HOME.toString() ||
        e.key === KeyboardKeys.LEFT.toString() ||
        e.key === KeyboardKeys.RIGHT.toString() ||
        e.key === KeyboardKeys.END.toString())) {
        // let it happen, don't do anything
        return;
      }
    const ch = e.key;
    const regEx =  new RegExp(this.numberRegex);
    if (regEx.test(ch)) {
      return;
     } else {
      e.preventDefault();
    }
  }
}
