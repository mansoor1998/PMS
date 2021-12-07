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
  protected onPageChange(page: number) {
    throw new Error('Method not implemented.');
  }
  protected refresh() {
    throw new Error('Method not implemented.');
  }
  protected addOrEdit(entity: CreateCompanyDto) {
    throw new Error('Method not implemented.');
  }
  

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

  public add(){
    const dialogRef = this.dialog.open(AddCompanyComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: CreateCompanyDto) => {
      // calling a service and passing the result service.

      // sample code saved for later on.
      // , (err: Error) => {
      //   // if(err.status === 500)
      //   this.framework.message('Interal Server Error', 'Error in edit', 'error');
      // }

    });
  }

  public edit(item: CreateCompanyDto){
    const dialogRef = this.dialog.open(AddCompanyComponent, {
      width: '400px',
      data: {
        id: item.id
      }
    });

    dialogRef.afterClosed().subscribe((result: CreateCompanyDto) => {
      // after closeing the dialog call the refresh button.
    })
  }

  public delete(entity: CreateCompanyDto) {
    // this is only sample for this occasion.
    const index = this.companies.findIndex(x => x.id === entity.id);
    this.companies.splice(index, 1);
    // throw new Error('Method not implemented.');
  }

}
