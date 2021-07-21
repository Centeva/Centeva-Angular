import { AfterViewInit, Directive, ElementRef } from '@angular/core';
export const HANDLER_WIDTH = 27;
export const MIN_CELL_WIDTH = 272;
@Directive({
  selector: '[thResizable]'
})
export class ThResizableDirective implements AfterViewInit {

  constructor(private _el: ElementRef) { }

  ngAfterViewInit(): void {
    if (this._el.nativeElement.nodeName !== 'TH') {
      throw new Error('TH resizable directive used for element which is not table header cell');
    }


    const resizer = document.createElement('span');
    // const initialWidth = this._el.nativeElement.offsetWidth + HANDLER_WIDTH < MIN_CELL_WIDTH
    //   ? MIN_CELL_WIDTH : this._el.nativeElement.offsetWidth + HANDLER_WIDTH;

    this._el.nativeElement.style.width = `${MIN_CELL_WIDTH}px`;
    resizer.setAttribute('min-width', MIN_CELL_WIDTH.toString());
    resizer.classList.add('resizer');
    this._el.nativeElement.appendChild(resizer);
  }
}
