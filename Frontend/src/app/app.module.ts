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



@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    SidebarUserAreaComponent,
    HomeComponent,
    AppSidebarNavComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ShareModule,
    MatTableModule
  ],
  providers: []
})
export class AppModule {
}
