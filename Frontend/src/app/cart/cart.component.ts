import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { appModuleAnimation } from 'src/shared/animations/routerTransition';
import { AppSession, Framework, Roles } from 'src/shared/framework';
import { PageListingComponentBase } from 'src/shared/page-listing-component-base';
import { OrderService } from 'src/shared/services/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { GetCartDto } from 'src/shared/services/order/order.dto';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [appModuleAnimation()]
})
export class CartComponent extends PageListingComponentBase<GetCartDto> implements OnInit {

  public Roles = Roles;
  public carts: Array<GetCartDto> = [];
  public appSession: AppSession;

  public customerName: string = '';

  public a: FormControl = new FormControl('', [Validators.required]);

  constructor(private orderService: OrderService, 
    private dialog: MatDialog, private framework: Framework, 
    private orderSerice: OrderService, private toastr: ToastrService,
    private router: Router
    ) {  
    super();
    this.appSession = this.framework.session;
  }

  ngOnInit(): void {
    this.busy = true;
    this.orderSerice.getAllCarts().subscribe((data) => {
      this.carts = data.arrayList;
      this.total = data.total;
      this.busy = false;
    }, (err) => { this.busy = false; });
  }

  ngAfterViewInit(){
  }

  public addOrEdit(entity: GetCartDto = null){
    throw new Error('Method not implemented.');
  }

  public onPageChange(page: number){
    if(this.busy) return;
    this.pageNumber = page;
    this.busy = true;
    this.orderSerice.getAllCarts((this.pageNumber - 1) * this.pageSize, this.pageSize).subscribe((item) => {
      console.log(item);
      this.total = item.total;
      this.carts = item.arrayList;

      this.busy = false;
    }, (err) => this.busy = false)
  }


  public delete(entity: GetCartDto) {
    this.orderSerice.deleteCart(entity.id).subscribe(() => {
      this.refresh();
    });
  }

  public refresh(isSearch: boolean = false){
    this.busy = true;
    // this.pageNumber = Math.floor((this.total - 1) / this.pageSize);
    if(isSearch) this.pageNumber = 1;
    this.orderSerice.getAllCarts((this.pageNumber - 1) * this.pageSize, this.pageSize).subscribe((data: {
      total: number,
      arrayList: GetCartDto[]
  }) => {
      this.carts = data.arrayList;
      this.total = data.total;
      this.busy = false;
    }, () => {
      this.busy = false;
    });
  }

  onSubmit(){
    if(this.customerName.length > 0 && this.carts.length > 0){
      this.orderSerice.create({ customerName: this.customerName }).subscribe((order: {orderNumber: string}) => {
        this.toastr.success('order created');
        this.router.navigate(['/app/invoice-search'], { queryParams: { orderNumber: order?.orderNumber } });
        // this.refresh();
      });
    } else {
      this.toastr.error('cart or name is empty');
    }
  }
}

