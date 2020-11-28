import {
  AfterViewInit,
  Component,
  ContentChild, ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, AfterViewInit {

  // @ViewChild('inputView') inputElement: ElementRef;
  // @ViewChild('iconView') iconElement: any;

  // private errorMessage: TemplateRef<HTMLElement>;

  // @Input() set setErrorMessage(value: TemplateRef<HTMLElement>){
  //   this.errorMessage = value;
  //   console.log(this.errorMessage);
  // }

  // get getErrorMessage(): TemplateRef<HTMLElement>{
  //   return this.errorMessage;
  // }

  @ViewChild('inputError') inputError: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //console.log(this.inputError.nativeElement);
  }
}
