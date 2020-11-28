import {Directive, ElementRef, HostBinding, Injectable, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[busy]'
})
@Injectable()
export class LoaderDirective implements OnChanges, OnInit{

  // tslint:disable-next-line:no-input-rename
  @Input('busy') busy = false;
  private busyContainer: any;
  private onLoad = false;

  constructor(
    private el: ElementRef, private renderer: Renderer2
  ) {
  }

  ngOnInit(): void{
    if (this.busy){
      this.createLoader();
    }
    this.onLoad = true;
  }

  ngOnChanges(): void{
    if (!this.onLoad) { return; }

    if (this.busy) {
      this.createLoader();
    }else{
      this.renderer.removeChild(this.el.nativeElement, this.busyContainer);
      this.busyContainer = null;
    }
  }

  createLoader(): void{
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');

    this.busyContainer = this.renderer.createElement('div');
    this.renderer.addClass(this.busyContainer, 'ripple');

    const rippleLoader = this.renderer.createElement('div');
    this.renderer.appendChild(this.busyContainer, rippleLoader);
    this.renderer.appendChild(this.el.nativeElement, this.busyContainer);

    /*this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.busyContainer = this.renderer.createElement('div');
    // this.renderer.setStyle(this.busyContainer, 'opacity', '0.2');
    // this.renderer.setStyle(this.busyContainer, 'display', 'flex');
    // this.renderer.setStyle(this.busyContainer, 'justify-content', 'center');
    // this.renderer.setStyle(this.busyContainer, 'align-items', 'center');
    // this.renderer.addClass(this.busyContainer, 'busy-container');
    // this.renderer.setStyle(this.busyContainer, 'position', 'absolute');
    // this.renderer.setStyle(this.busyContainer, 'top', '0');
    // this.renderer.setStyle(this.busyContainer, 'background', '#000000');
    // this.renderer.setStyle(this.busyContainer, 'width', '100%');
    // this.renderer.setStyle(this.busyContainer, 'height', '100%');
    this.renderer.addClass(this.busyContainer, 'busy-container');
    // ripple loader.
    const rippleLoader = this.renderer.createElement('div');
    this.renderer.addClass(rippleLoader, 'ripple-loader');
    const childRippleOne = this.renderer.createElement('div');
    const childRippleTwo = this.renderer.createElement('div');

    this.renderer.appendChild(rippleLoader, childRippleOne);
    this.renderer.appendChild(rippleLoader, childRippleTwo);
    this.renderer.appendChild(this.busyContainer, rippleLoader);
    this.renderer.appendChild(this.el.nativeElement, this.busyContainer);*/
  }

}
