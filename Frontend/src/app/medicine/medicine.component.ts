import { ChangeDetectorRef, Component, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { timeStamp } from 'console';
import { appModuleAnimation } from 'src/shared/animations/routerTransition';
import { AppSession, Framework, Roles } from 'src/shared/framework';
import { PageListingComponentBase } from 'src/shared/page-listing-component-base';
import { CreateMedicineDto } from 'src/shared/services/medicine/medicine.dto';
import { IMedicineService, MedicineService } from 'src/shared/services/medicine/medicine.service';
import { IOrderService, OrderService } from 'src/shared/services/order/order.service';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css'],
  animations: [appModuleAnimation()]
})
export class MedicineComponent extends PageListingComponentBase<CreateMedicineDto> implements OnInit {

  public Roles = Roles;
  public medicines: Array<CreateMedicineDto> = [];
  public appSession: AppSession;
  @ViewChildren('qty') quantities!: QueryList<any>;

  constructor(@Inject('IMedicineService') private medicineService: IMedicineService, 
    private dialog: MatDialog, private framework: Framework, 
    @Inject('IOrderService') private orderSerice: IOrderService, private toastr: ToastrService,
    private ref: ChangeDetectorRef
    ) {  
    super();
    this.appSession = this.framework.session;
  }

  ngOnInit(): void {
    this.busy = true;
    this.medicineService.getall(0, 10, '').subscribe((data: {
      total: number,
      arrayList: CreateMedicineDto[]
    }) => {
      this.medicines = data.arrayList;
      this.total = data.total;
      this.busy = false;
    }, (err) => { this.busy = false; });
  }

  ngAfterViewInit(){
  }

  public addOrEdit(entity: CreateMedicineDto = null){
    const dialogRef = this.dialog.open(AddMedicineComponent, {
      width: '400px',
      data: (entity) ? { id: entity.id }: undefined 
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result == 'ADD')
        this.refresh();
    });
  }

  public onPageChange(page: number){
    if(this.busy) return;
    this.pageNumber = page;
    this.busy = true;
    this.medicineService.getall((this.pageNumber - 1) * this.pageSize, this.pageSize, '').subscribe((item) => {
      this.total = item.total;
      this.medicines = item.arrayList;

      this.busy = false;
    }, (err) => this.busy = false)
  }


  public delete(entity: CreateMedicineDto) {

    this.medicineService.delete(entity.id).subscribe(() => {
      if ( (this.total - 1) < (this.pageNumber - 1) * this.pageSize + 1 ) this.pageNumber --;
      this.refresh(true);
    });
  }

  public refresh(isSearch: boolean = false){
    this.busy = true;
    // this.pageNumber = Math.floor((this.total - 1) / this.pageSize);
    if(isSearch) this.pageNumber = 1;
    this.medicineService.getall((this.pageNumber - 1) * this.pageSize, this.pageSize, this.search).subscribe((data: {
      total: number,
      arrayList: CreateMedicineDto[]
  }) => {
      this.medicines = data.arrayList;
      this.total = data.total;
      this.busy = false;
    }, () => {
      this.busy = false;
    });
  }


  public addToCart(index: number){

    let id = this.medicines[index].id;
    const quantity = parseInt(this.quantities.toArray()[index].nativeElement.value);
    if(quantity > 0){
      this.orderSerice.addToCart({ medicineId: id, quantity: quantity }).subscribe((result: CreateMedicineDto) => {
        if(result) { this.medicines[index].quantity = result.quantity; this.refresh(); }
        this.quantities.toArray()[index].nativeElement.value = '0';
        this.toastr.success('added to the cart');
      });
    } else { 
      this.toastr.error('add the quantity');
    }
  }

}
