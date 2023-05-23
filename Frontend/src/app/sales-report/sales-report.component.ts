import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { appModuleAnimation } from 'src/shared/animations/routerTransition';
import { AppSession, Framework } from 'src/shared/framework';
import { GetOrderDto } from 'src/shared/services/order/order.dto';
import { IOrderService, OrderService } from 'src/shared/services/order/order.service';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css'],
  animations: [appModuleAnimation()]
})
export class SalesReportComponent implements OnInit {

  public date: FormGroup;

  public busy: boolean = false;

  public reportData: GetOrderDto[] = [];

  public session:AppSession;

  constructor(private fb: FormBuilder, @Inject('IOrderService') private orderService: IOrderService, framwork: Framework) {
    this.session = framwork.session;
  }

  ngOnInit(): void {
    this.date = this.fb.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]]
    });
  }

  get _from(){
    return this.date.get('from');
  }

  get _to(){
    return this.date.get('to');
  }


  onSubmit() {
    this.date.markAllAsTouched();
    if(this.date.valid){
      const date = this.date.value as {from: Date, to: Date};
      this.busy = true;
      this.orderService.getSalesReport(date).subscribe((data: GetOrderDto[]) => {
        this.reportData = data;
        this.busy = false;
      }, (err) => this.busy = false);
    }
  }

}
