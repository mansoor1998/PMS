import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { InputComponent } from './components/input/input.component';
import { InputErrorComponent } from './components/input/input-error/input-error.component';
import { VisibilityDirective } from './directives/visibility.directive';
import { LoaderDirective } from './directives/loader.directive';
import { PopupDialogComponent } from './components/error-dialog/popup-dialog.component';
import {PreLoaderComponent} from './components/pre-loader/pre-loader.component';

@NgModule({
  declarations: [
    DropdownMenuComponent,
    InputComponent,
    InputErrorComponent,
    VisibilityDirective,
    LoaderDirective,
    PopupDialogComponent,
    PreLoaderComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatRippleModule
  ],
  entryComponents: [
    PopupDialogComponent
  ],
  exports: [
    DropdownMenuComponent,
    InputComponent,
    MatIconModule,
    MatRippleModule,
    InputErrorComponent,
    VisibilityDirective,
    LoaderDirective
  ]
})
export class ShareModule { }
