import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceExecutionRoutingModule } from './service-execution-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ServiceExecutionRoutingModule
  ]
})
export class ServiceExecutionModule { }
