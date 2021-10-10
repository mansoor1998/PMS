import {AfterViewInit, Directive, ElementRef, Injectable, Input, OnChanges} from '@angular/core';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[visibility]'
})
@Injectable()
export class VisibilityDirective implements OnChanges{
  @Input('visibility') visible: boolean;
  constructor(private el: ElementRef) {
    this.setToggleView();
  }

  ngOnChanges(): void {
    this.setToggleView();
  }

  setToggleView(): void {
    this.el.nativeElement.style.opacity = (this.visible) ? 1 : 0;
    this.el.nativeElement.style.visibility = (this.visible) ? 'visible' : 'hidden';
  }

}
