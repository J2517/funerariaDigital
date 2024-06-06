import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service_executionRoutingModule } from './service_execution-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    Service_executionRoutingModule
  ]
})
export class Service_executionModule { }
