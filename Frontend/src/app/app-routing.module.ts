import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AuthRouteGuard} from '../shared/auth/auth-route-gaurd';
import { CompanyComponent } from './company/company.component';
import { MedicineComponent } from './medicine/medicine.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthRouteGuard]
      },
      {
        path: 'company',
        component: CompanyComponent,
        canActivate: [AuthRouteGuard]
      },
      {
        path: 'medicine',
        component: MedicineComponent,
        canActivate: [AuthRouteGuard]
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
