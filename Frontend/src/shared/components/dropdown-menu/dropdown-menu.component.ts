import {AfterContentInit, Component, ContentChild, ElementRef, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css']
})
export class DropdownMenuComponent implements OnInit, AfterContentInit {

  @ContentChild('icon') icon: ElementRef;
  @ContentChild('menu') menu: ElementRef;

  private hidden = false;

  @HostListener('document:click', ['$event'])
  clickout(event): void {
    if (this.icon && !this.icon.nativeElement.contains(event.target) && !this.menu.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }

  constructor(private host: ElementRef) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterContentInit(): void{

    if (this.icon) {
      this.icon.nativeElement.addEventListener('click', (event) => {
        this.hidden = !this.hidden;
        if (this.hidden){
          this.menu.nativeElement.classList.add('show');
          this.menu.nativeElement.classList.remove('hide');
        }else{
          this.menu.nativeElement.classList.remove('show');
          this.menu.nativeElement.classList.add('hide');
        }
      });
    }

    if (this.menu){
      this.menu.nativeElement.classList.add('hide');
      this.menu.nativeElement.classList.remove('show');
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.menu.nativeElement.children.length; i++){
        this.menu.nativeElement.children[i].addEventListener('click', (event) => {
          this.closeMenu();
        });
      }
    }
  }

  closeMenu(): void{
    this.hidden = false;
    this.menu.nativeElement.classList.add('hide');
    this.menu.nativeElement.classList.remove('show');
  }

}
