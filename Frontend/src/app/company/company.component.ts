import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { resourceUsage } from 'process';
import { appModuleAnimation } from 'src/shared/animations/routerTransition';
import { Framework } from 'src/shared/framework';
import { PageListingComponentBase } from 'src/shared/page-listing-component-base';
import { CreateCompanyDto } from 'src/shared/services/company/company.dto';
import { CompanyService } from 'src/shared/services/company/company.service';
import { AddCompanyComponent } from './add-company/add-company.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  animations: [appModuleAnimation()]
})
export class CompanyComponent extends PageListingComponentBase<CreateCompanyDto> implements OnInit {
  

  
  

  public companies: Array<CreateCompanyDto> = [ 
    // {
    //   id: 123,
    //   name: 'Paracetamol',
    //   description: 'used for random purposes'
    // }
  ];

  // public pageSize = 10;
  // public pageNumber = 1;
  // public length = this.companies.length;

  constructor(private dialog: MatDialog, public framework: Framework, private companyService: CompanyService) {
    super(); 
    this.totalItems = this.companies.length;
    // console.log('the name of the person'); 
    // super(companies); 
  }

  ngOnInit(): void {
    this.busy = true;
    this.companyService.getall().subscribe((data: {
      total: number,
      arrayList: CreateCompanyDto[]
  }) => {
      this.companies = data.arrayList;
      this.busy = false; 
    }, (err) => {
      this.busy = false;
    });
  }

  public addOrEdit(entity: CreateCompanyDto = null){
    const dialogRef = this.dialog.open(AddCompanyComponent, {
      width: '400px',
      data: (entity) ? { id: entity.id } : undefined
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('closed');
      if(result == 'ADD')
        this.refresh();
    });
  }

  public onPageChange(page: number) {
    if(this.busy) return;
    this.pageNumber = page;
    this.busy = true;
    this.companyService.getall((this.pageNumber - 1) * this.pageSize, this.pageSize).subscribe((item) => {
      this.total = item.total;
      this.companies = item.arrayList;

      this.busy = false;
    }, (err) => this.busy = false)
  }

  public delete(entity: CreateCompanyDto) {

    this.companyService.delete(entity.id).subscribe(() => {
      if ( (this.total - 1) < (this.pageNumber - 1) * this.pageSize + 1 ) this.pageNumber --;
      this.refresh();
    });
  }

  public refresh(isSearch: boolean = false){
    this.busy = true;
    // this.pageNumber = Math.floor((this.total - 1) / this.pageSize);
    if(isSearch) this.pageNumber = 1;
    this.companyService.getall((this.pageNumber - 1) * this.pageSize, this.pageSize, this.search).subscribe((data: {
      total: number,
      arrayList: CreateCompanyDto[]
  }) => {
      this.companies = data.arrayList;
      this.total = data.total;
      this.busy = false;
    }, () => {
      this.busy = false;
    });
  }

}
