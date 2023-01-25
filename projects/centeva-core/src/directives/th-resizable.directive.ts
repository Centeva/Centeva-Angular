import { AfterViewInit, Directive, ElementRef } from '@angular/core';
export const HANDLER_WIDTH = 27;
export const MIN_CELL_WIDTH = 272;
@Directive({
  selector: '[thResizable]'
})
export class ThResizableDirective implements AfterViewInit {

  constructor(private _el: ElementRef) { }

  ngAfterViewInit(): void {
    let resizer: HTMLSpanElement;
    let th: HTMLTableCellElement;
    let addResizerToDom: boolean = false;

    if (this._el.nativeElement?.tagName === 'SPAN' && this._el.nativeElement?.classList?.contains('resizer')) {
      resizer = this._el.nativeElement;
      let el = resizer.parentNode;
      while (el?.nodeName !== 'TH') {
        el = el.parentNode;
      }
      th = <HTMLTableCellElement>el;
    }
    else if (this._el.nativeElement?.nodeName === 'TH') {
      addResizerToDom = true;
      resizer = document.createElement('span');
      resizer.classList.add('resizer');
      th = this._el.nativeElement;
    }
    else {
      throw new Error('TH resizable directive used for element which is not table header cell or resizer');
    }

    setTimeout(() => {
      const width = th.getBoundingClientRect()?.width;
      const startingWidth = width < MIN_CELL_WIDTH ? MIN_CELL_WIDTH : width;
      resizer.setAttribute('initial-width', startingWidth.toString());
      if (addResizerToDom) {
        th.appendChild(resizer);
      }
      th.style.width = `${startingWidth}px`;
      th.style.minWidth = `${startingWidth}px`;
    }, 0);
  }
}
