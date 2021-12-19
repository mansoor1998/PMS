import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AuthRouteGuard} from '../shared/auth/auth-route-gaurd';
import { CompanyComponent } from './company/company.component';
import { MedicineComponent } from './medicine/medicine.component';
import { PharmacistComponent } from './pharmacist/pharmacist.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { CartComponent } from './cart/cart.component';
import { InvoiceSearchComponent } from './invoice-search/invoice-search.component';
import { SalesReportComponent } from './sales-report/sales-report.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthRouteGuard],
        // data: { role: 'Admin' }
      },
      {
        path: 'company',
        component: CompanyComponent,
        canActivate: [AuthRouteGuard],
        data: { role: 'Admin' }
      },
      {
        path: 'medicine',
        component: MedicineComponent,
        canActivate: [AuthRouteGuard]
      },
      {
        path: 'pharmacist',
        component: PharmacistComponent,
        canActivate: [AuthRouteGuard],
        data: { role: 'Admin' }
      },
      {
        path: 'update-password',
        component: UpdatePasswordComponent,
        canActivate: [AuthRouteGuard]
      },
      {
        path: 'cart',
        component: CartComponent,
        canActivate: [AuthRouteGuard]
      },
      {
        path: 'invoice-search',
        component: InvoiceSearchComponent,
        canActivate: [AuthRouteGuard]
      },
      {
        path: 'sales-report',
        component: SalesReportComponent,
        canActivate: [AuthRouteGuard],
        // data: { role: 'Admin' }
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
