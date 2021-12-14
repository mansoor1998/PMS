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
  public data: any;
  public currentPage: number = 1;
  constructor(private framework: Framework) { }

  ngOnInit(): void {
    console.log(this.framework.session);

    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(json => this.data = json)

  }

}

