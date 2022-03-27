import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {Framework} from '../../framework';

@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.css']
})
export class PopupDialogComponent implements OnInit {

  public  SUCCESS =  'success';
  public  WARN =  'warning';
  public  ERROR =  'error';

  @Input('title') title = '';
  @Input('body') body = '';
  @Input('type') type = ''; // dialog type

  // @HostListener('click', ['$event'])
  // onClick(event): void {
  //   if ( this.host.nativeElement && this.host.nativeElement.contains(event.target) ){
  //     console.log('this is clicked outside');
  //     this.destory();
  //   }
  // }

  constructor(private host: ElementRef<HTMLElement>, private framework: Framework) { }

  ngOnInit(): void {
  }

  destory(): void {
    this.host.nativeElement.childNodes.forEach(item => {
      (item as HTMLElement).classList.remove('popup--visible');
    });
    setTimeout( () => {
      this.host.nativeElement.remove();
      this.framework.message.renderElement();
    }, 300);
  }


}
