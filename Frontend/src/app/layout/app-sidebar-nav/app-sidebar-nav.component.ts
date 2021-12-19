import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import { AppSession, Framework } from 'src/shared/framework';
import {SideBar} from '../../../shared/sidebar';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './app-sidebar-nav.component.html',
  styleUrls: ['./app-sidebar-nav.component.css']
})
export class AppSidebarNavComponent implements OnInit {

  public session: AppSession;

  constructor(private host: ElementRef<HTMLElement>, framework: Framework) {
    this.session = framework.session;
  }

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
