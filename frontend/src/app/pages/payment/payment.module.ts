import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import {PaymentRoutingModule} from "./payment-routing.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
    imports: [
        CommonModule,
        PaymentRoutingModule,
        ReactiveFormsModule
    ]
})
export class PaymentModule { }
