import { BrowserModule } from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CommonModule} from '@angular/common';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { SidebarUserAreaComponent } from './layout/sidebar-user-area/sidebar-user-area.component';
import {ShareModule} from '../shared/share.module';
import { HomeComponent } from './home/home.component';
import { AppSidebarNavComponent } from './layout/app-sidebar-nav/app-sidebar-nav.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { InventoryComponent } from './inventory/inventory.component';
import { InvoiceSearchComponent } from './invoice-search/invoice-search.component';
import { CompanyComponent } from './company/company.component';
import { MedicineComponent } from './medicine/medicine.component';
import { PharmacistComponent } from './pharmacist/pharmacist.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { AddMedicineComponent } from './medicine/add-medicine/add-medicine.component';
import { AddPharmacistComponent } from './pharmacist/add-pharmacist/add-pharmacist.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { ToastrModule } from 'ngx-toastr';
import { CartComponent } from './cart/cart.component';
import {Chart, registerables} from 'chart.js';
import { UserService, UserServiceMock } from 'src/shared/services/users/user.service';
import { OrderService, OrderServiceMock } from 'src/shared/services/order/order.service';
import { MedicineService, MedicineServiceMock } from 'src/shared/services/medicine/medicine.service';
import { CompanyService, CompanyServiceMock } from 'src/shared/services/company/company.service';



@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    SidebarUserAreaComponent,
    HomeComponent,
    AppSidebarNavComponent,
    InventoryComponent,
    InvoiceSearchComponent,
    CompanyComponent,
    MedicineComponent,
    PharmacistComponent,
    SalesReportComponent,
    AddMedicineComponent,
    AddPharmacistComponent,
    AddCompanyComponent,
    UpdatePasswordComponent,
    CartComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ShareModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    NgxPaginationModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    ClipboardModule
  ],
  providers: [
    { provide: 'IUserService', useClass: UserServiceMock }, 
    { provide: 'IOrderService', useClass: OrderServiceMock }, 
    { provide: 'IMedicineService', useClass: MedicineServiceMock },
    { provide: 'ICompanyService', useClass: CompanyServiceMock }
  ]
})
export class AppModule {
  constructor() {
    Chart.register(...registerables);
  }
}
