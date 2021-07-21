import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener
} from '@angular/core';
import { MIN_CELL_WIDTH } from './th-resizable.directive';



@Directive({
  selector: '[tableResizer]'
})
export class TableResizerDirective implements AfterViewInit {
  private _startX: number;

  private _startWidth: number;

  private _th: HTMLTableHeaderCellElement;

  private _table: HTMLTableElement;

  private _minWidth = MIN_CELL_WIDTH;

  readonly span = 'SPAN';

  constructor(private _el: ElementRef) { }

  ngAfterViewInit(): void {
    if (!(this._el.nativeElement instanceof HTMLTableElement)) {
      throw new Error('Table resizer directive used for element which is not table');
    }
    this._table = this._el.nativeElement;
    this._table.classList.add('resizable');
    this._table.addEventListener('mousedown', this.onMousedown.bind(this));
  }

  onMousedown(event: any): void {
    if (event.target.tagName === this.span && event.target.classList.contains('resizer')) {
      this._th = event.target.parentElement;
      this._startX = event.pageX;
      this._startWidth = this._th.offsetWidth;
      this._table.classList.add('resizing');
      this._minWidth = +event.target.getAttribute('initial-width') || MIN_CELL_WIDTH;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: any): void {
    if (this._th) {
      let newWidth = this._startWidth + (event.pageX - this._startX);

      if (newWidth < this._minWidth) {
        newWidth = this._minWidth;
      }
      this._th.style.width = `${newWidth}px`
    }
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    if (this._th) {
      this._table.classList.remove('resizing');
      this._th = null;
    }
  }
}
