import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RootComponent} from './root.component';

const routes: Routes = [
  { path: '', redirectTo: 'account/login', pathMatch: 'full' },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
    data: { preload: false }
  },
  {
    path: 'app',
    loadChildren: () => import('./app/app.module').then(m => m.AppModule), // Lazy load app module
    data: { preload: false }
  },
  {
    path: '**',
    redirectTo: 'account/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule { }
