import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { timeStamp } from 'console';
import { appModuleAnimation } from 'src/shared/animations/routerTransition';
import { PageListingComponentBase } from 'src/shared/page-listing-component-base';
import { CreateMedicineDto } from 'src/shared/services/medicine/medicine.dto';
import { MedicineService } from 'src/shared/services/medicine/medicine.service';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css'],
  animations: [appModuleAnimation()]
})
export class MedicineComponent extends PageListingComponentBase<CreateMedicineDto> implements OnInit {


  public medicines: Array<CreateMedicineDto> = [];

  constructor(private medicineService: MedicineService, private dialog: MatDialog) {  
    super();
  }

  ngOnInit(): void {
    this.busy = true;
    this.medicineService.getall().subscribe((data: {
      total: number,
      arrayList: CreateMedicineDto[]
  }) => {
      console.log (data);
      this.medicines = data.arrayList;
      this.total = data.total;
      this.busy = false;
    }, (err) => { this.busy = false; });
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
    this.medicineService.getall((this.pageNumber - 1) * this.pageSize, this.pageSize).subscribe((item) => {
      this.total = item.total;
      this.medicines = item.arrayList;

      this.busy = false;
    }, (err) => this.busy = false)
  }


  // public edit(entity: CreateMedicineDto) {
  //   const dialogRef = this.dialog.open(AddMedicineComponent, {
  //     width: '400px',
  //     data: { id: entity.id }
  //   });
  // }

  public delete(entity: CreateMedicineDto) {

    this.medicineService.delete(entity.id).subscribe(() => {
      // let index = this.medicines.findIndex(x => x.id == entity.id);
      // this.medicines.splice( index, 1 );
      if ( (this.total - 1) < (this.pageNumber - 1) * this.pageSize + 1 ) this.pageNumber --;
      this.refresh();
    });
  }

  public refresh(){
    this.busy = true;
    // this.pageNumber = Math.floor((this.total - 1) / this.pageSize);
    
    
    this.medicineService.getall((this.pageNumber - 1) * this.pageSize, this.pageSize).subscribe((data: {
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

}
