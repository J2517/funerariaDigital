import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountHolderRoutingModule } from './account-holder-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    AccountHolderRoutingModule
  ]
})
export class AccountHolderModule { }
