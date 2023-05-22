import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { appModuleAnimation } from 'src/shared/animations/routerTransition';
import { GetOrderDto } from 'src/shared/services/order/order.dto';
import { IOrderService, OrderService } from 'src/shared/services/order/order.service';

@Component({
  selector: 'app-invoice-search',
  templateUrl: './invoice-search.component.html',
  styleUrls: ['./invoice-search.component.css'],
  animations: [appModuleAnimation()]
})
export class InvoiceSearchComponent implements OnInit {

  public search: string = '';
  public order: GetOrderDto;

  public busy = false;

  constructor(@Inject('IOrderService') private orderService: IOrderService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((data) => {
      const {orderNumber} = data;
      if(orderNumber){
        this.busy = true;
        this.search = orderNumber;
        this.searchOrder();
      }
    });
  }

  searchOrder(){
    this.orderService.getByOrderNumber(this.search).subscribe(data => {
      this.order = data;
      this.busy = false;
      this.router.navigate(
        [], 
        {
          queryParams: { orderNumber: this.search }, 
          queryParamsHandling: 'merge', // remove to replace all query params by provided
        });
    }, (err) => this.busy = false);
  }

}
