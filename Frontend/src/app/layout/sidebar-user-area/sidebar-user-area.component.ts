import {Component, ElementRef, OnInit, Inject} from '@angular/core';
import {Framework} from '../../../shared/framework';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-sidebar-user-area',
  templateUrl: './sidebar-user-area.component.html',
  styleUrls: ['./sidebar-user-area.component.css']
})
export class SidebarUserAreaComponent implements OnInit {

  public name: string = ''; 
  public username: string = '';


  constructor(private framework: Framework, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    const {Name: name, Username: username } =  this.framework.session;
    this.name = name;
    this.username = username;
  }

  logout(event: MouseEvent): void {
    try{
      localStorage.removeItem('isLogged');
    }catch(e){}
    this.framework.session.removeToken('auth-token');
    window.location.href = this.document.getElementsByTagName('base')[0].href + '/account/login'
    // window.location.replace ('/account/login');
  }
}
