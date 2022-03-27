import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { appModuleAnimation } from 'src/shared/animations/routerTransition';
import { AppSession, Framework } from 'src/shared/framework';
import { PageListingComponentBase } from 'src/shared/page-listing-component-base';
import { CreateUserDto, GetUserDto } from 'src/shared/services/users/user.dto';
import { UserService } from 'src/shared/services/users/user.service';
import { AddPharmacistComponent } from './add-pharmacist/add-pharmacist.component';

@Component({
  selector: 'app-pharmacist',
  templateUrl: './pharmacist.component.html',
  styleUrls: ['./pharmacist.component.css'],
  animations: [appModuleAnimation()]
})
export class PharmacistComponent extends PageListingComponentBase<GetUserDto> implements OnInit {
 
  public pharmacist: GetUserDto[] = [];
  session: AppSession;

  constructor(private userService: UserService, private dialog: MatDialog, private framework: Framework) {
    super();
    this.session = this.framework.session;
  }

  ngOnInit(): void {
    this.busy = true;
    this.userService.getAll().subscribe((data) => {
      console.log(data);
      this.pharmacist = data.arrayList;
      this.total = data.total;
      this.busy = false;
    }, (err) => { this.busy = false; });
  }

  
  public addOrEdit(entity: GetUserDto = null) {
    const dialogRef = this.dialog.open(AddPharmacistComponent, {
      width: '400px',
      data: (entity) ? { id: entity.id }: undefined 
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result == 'ADD')
        this.refresh();
    });
  }

  public delete(entity: GetUserDto) {
    throw new Error('Method does not exist');
  }

  public onPageChange(page: number) {
    if(this.busy) return;
    this.pageNumber = page;
    this.busy = true;
    this.userService.getAll((this.pageNumber - 1) * this.pageSize, this.pageSize).subscribe((item) => {
      this.total = item.total;
      this.pharmacist = item.arrayList;

      this.busy = false;
    }, (err) => this.busy = false)
  }

  public refresh(isSearch: boolean = false) {
    this.busy = true;
    // this.pageNumber = Math.floor((this.total - 1) / this.pageSize);
    if(isSearch) this.pageNumber = 1;
    this.userService.getAll((this.pageNumber - 1) * this.pageSize, this.pageSize, this.search).subscribe((data: {
      total: number,
      arrayList: GetUserDto[]
  }) => {
      this.pharmacist = data.arrayList;
      this.total = data.total;
      this.busy = false;
    }, () => {
      this.busy = false;
    });
  }

}
