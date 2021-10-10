import { Component, OnInit } from '@angular/core';
import {accountModuleAnimation, appModuleAnimation} from '../../shared/animations/routerTransition';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  animations: [appModuleAnimation()]
})
export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
