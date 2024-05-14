import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraveRoutingModule } from './grave-routing.module';
import { ListComponentGrave } from './list/list.component';


@NgModule({
  declarations: [
    ListComponentGrave
  ],
  imports: [
    CommonModule,
    GraveRoutingModule
  ]
})
export class GraveModule { }
