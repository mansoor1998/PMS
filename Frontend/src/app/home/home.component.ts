import { Component, Inject, OnInit } from '@angular/core';
import {appModuleAnimation} from '../../shared/animations/routerTransition';
import {AppSession, Framework} from '../../shared/framework';
import { IOrderService, OrderService } from 'src/shared/services/order/order.service';
import { Chart } from 'chart.js';

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
  public widgetsData: any = {};
  public session: AppSession;
  
  
  constructor(framework: Framework, @Inject('IOrderService') private orderService: IOrderService) {
    this.session = framework.session;
  }

  ngOnInit(): void {

    this.orderService.getWidgetsData().subscribe(data => {
      this.widgetsData = data;
      console.log(data);
    });

    this.orderService.getDailySales().subscribe(data => {
      this.renderChart(data); 
    });


    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(json => this.data = json)
  }

  renderChart(data: { count: number, created: Date}[]) {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    // new Chart(ctx.getContext('2d'), {
    //   type: 'line',
    //   data: {
    //     labels: data?.map(x => new Date(x.created).toLocaleDateString()),
    //     datasets: [{
    //         label: 'Sales Report',
    //         data: data.map(x => x.count),
    //         borderWidth: 5
    //     }]
    //   }
    // });
  }

}



