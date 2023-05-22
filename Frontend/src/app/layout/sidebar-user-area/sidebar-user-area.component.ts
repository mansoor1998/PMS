import {Component, ElementRef, OnInit} from '@angular/core';
import {Framework} from '../../../shared/framework';

@Component({
  selector: 'app-sidebar-user-area',
  templateUrl: './sidebar-user-area.component.html',
  styleUrls: ['./sidebar-user-area.component.css']
})
export class SidebarUserAreaComponent implements OnInit {

  public name: string = ''; 
  public username: string = '';


  constructor(private framework: Framework) { }

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
    // console.log('this is cookie logout');
    window.location.replace ('/account/login');
  }
}
