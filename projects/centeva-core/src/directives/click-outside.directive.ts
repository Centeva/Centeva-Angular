import {Directive, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';
@Directive({
    selector: '[clickOutside]',
})
export class ClickOutsideDirective {
    constructor(private _elementRef: ElementRef) {
    }
    @Output()
    public clickOutside = new EventEmitter();
    @HostListener('document:click', ['$event'])
    public onClick(event) {
      const existsInDom = document.contains(event.target);
      const clickedInside = this._elementRef.nativeElement.contains(event.target);
      if (!clickedInside && existsInDom) {
        this.clickOutside.emit(event);
      }
    }
}
