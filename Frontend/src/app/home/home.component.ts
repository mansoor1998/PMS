import { Component, OnInit } from '@angular/core';
import {appModuleAnimation} from '../../shared/animations/routerTransition';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {Framework} from '../../shared/framework';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [appModuleAnimation()]
})
export class HomeComponent implements OnInit {
  isLoading: any = true;
  constructor(private framework: Framework) { }

  ngOnInit(): void {
    console.log(this.framework.session);
  }

}

