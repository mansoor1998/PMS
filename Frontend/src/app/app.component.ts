import {Component, ComponentFactoryResolver, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {SideBar} from '../shared/sidebar';
import {PopupDialogComponent} from '../shared/components/error-dialog/popup-dialog.component';
import { Framework } from '../shared/framework';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PMS';

  // @ViewChild('hamburgerMenu') hamburgerMenu: ElementRef;


  constructor(private framework: Framework, private elRef: ElementRef) {
  }

  ngOnInit(): void {
    this.framework.preLoader.remove();
  }
}
