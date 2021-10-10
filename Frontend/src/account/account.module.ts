import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import {AccountRoutingModule} from './account-routing.module';
import {ShareModule} from '../shared/share.module';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [AccountComponent, LoginComponent],
    imports: [
        CommonModule,
        AccountRoutingModule,
        ShareModule,
        ReactiveFormsModule
    ]
})
export class AccountModule { }
