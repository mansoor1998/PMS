import {Component, ElementRef, OnInit} from '@angular/core';
import {Framework} from '../../../shared/framework';

@Component({
  selector: 'app-sidebar-user-area',
  templateUrl: './sidebar-user-area.component.html',
  styleUrls: ['./sidebar-user-area.component.css']
})
export class SidebarUserAreaComponent implements OnInit {

  constructor(private framework: Framework) { }

  ngOnInit(): void {
  }

  logout(event: MouseEvent): void {
    this.framework.session.removeToken('auth-token');
    console.log('this is cookie logout');
    window.location.replace ('/account/login');
  }
}
