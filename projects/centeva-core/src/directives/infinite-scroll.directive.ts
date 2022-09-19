import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInfiniteScrollOnBottom]'
})
export class InfiniteScrollDirective {
  @Input() infiniteScrollDistance : number = 25; // percentage until it loads another page
  @Output() appInfiniteScrollOnBottom = new EventEmitter();

  observer: IntersectionObserver;

  constructor(private elem: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    let bottomMargin = this.elem.nativeElement.clientHeight * (this.infiniteScrollDistance / 100);

    // find if you are in a scrollable container
    let root = this.findScrollableParent(this.elem.nativeElement);

    // add element to end of container to track intersection with
    let end = this.renderer.createElement("div");
    this.renderer.appendChild(this.elem.nativeElement, end);

    // when the element you added intersects with the screen emit your output
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) this.appInfiniteScrollOnBottom.emit();
    },{
      root: <Element>root,
      rootMargin: `0px 0px ${bottomMargin}px 0px`
    });
    this.observer.observe(<Element>end);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  private findScrollableParent(element: Element): Element | null{
    if (!element) return null;
    const style = window.getComputedStyle(element);
    let isOverflow = style.getPropertyValue('overflow') === 'auto' || style.getPropertyValue('overflow-y') === 'scroll';
    if (isOverflow) return element;
    return this.findScrollableParent(element?.parentElement)
  }

}
