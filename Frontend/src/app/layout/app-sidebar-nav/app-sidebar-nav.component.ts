import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {SideBar} from '../../../shared/sidebar';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './app-sidebar-nav.component.html',
  styleUrls: ['./app-sidebar-nav.component.css']
})
export class AppSidebarNavComponent implements OnInit {

  constructor(private host: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
  }


  @HostListener('document:click', ['$event'])
  clickout(event): void {
    if (document.getElementById('nav-icon').contains( event.target )) {
      return;
    }
    if (!this.host.nativeElement.contains(event.target)) {
      SideBar.closeSidebar();
    }
  }

}
