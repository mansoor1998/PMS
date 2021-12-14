import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import {AfterContentInit, Component, ContentChild, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({opacity: 0, "margin-top": '25px'}),
        animate('0.3s ease-in', style({'opacity': '1', "margin-top": '0'}))
      ]) ,
      transition(':leave', [
        style({opacity: 1, "margin-top": '0'}),
        animate('0.3s ease-out', style({'opacity': '0', "margin-top": '25px'}))
      ])
    ])
  ]
})
export class DropdownMenuComponent implements OnInit, AfterContentInit {

  @ContentChild('icon') icon: ElementRef;
  @ContentChild('menu') menu: ElementRef;

  @ViewChild('menuItem', {static: false}) menuItem: ElementRef;

  public menuPosX = 0;
  public menuPosY = 0;

  public hidden = false;

  get getPosY(): number{
    return this.menuPosY;
  }

  get getPosX(): number{
    return this.menuPosX;
  }

  @HostListener('document:click', ['$event'])
  clickout(event): void {
    if (this.icon && !this.icon.nativeElement.contains(event.target) && !this.menu.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }

  constructor(private host: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => console.log(this.menuItem), 5000)
    if(this.menuItem)
    console.log(this.menuItem);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterContentInit(): void{

    if (this.icon) {
      this.icon.nativeElement.addEventListener('click', (event) => {
        this.hidden = !this.hidden;

        // if (this.hidden){
        //   this.menu.nativeElement.classList.add('show');
        //   this.menu.nativeElement.classList.remove('hide');
        // }else{
        //   this.menu.nativeElement.classList.remove('show');
        //   this.menu.nativeElement.classList.add('hide');
        // }
      });
    }

    if (this.menu){
      // this.menu.nativeElement.classList.add('hide');
      // this.menu.nativeElement.classList.remove('show');
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.menu.nativeElement.children.length; i++){
        this.menu.nativeElement.children[i].addEventListener('click', (event) => {
          this.closeMenu();
        });
      }
    }
  }

  ngAfterContentChecked(): void {
    if(this.icon){
      this.menuPosY = this.icon.nativeElement.getBoundingClientRect().y;
      this.menuPosX = this.icon.nativeElement.getBoundingClientRect().x;  
    }

    if(this.menu){
      // console.log(this.menu);
      // document.body.appendChild(this.menu.nativeElement);
    }
  }

  closeMenu(): void{
    this.hidden = false;
    // this.menu.nativeElement.classList.add('hide');
    // this.menu.nativeElement.classList.remove('show');
  }

}
