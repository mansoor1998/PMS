import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// import {AppSettings} from '../../shared/AppSettings';
import {Router} from '@angular/router';
import {SideBar} from '../../../shared/sidebar';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  toggleSidebar(): void{
    SideBar.toggleSidebar();
  }

}
