import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeadQuarterRoutingModule } from './head-quarter-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
    imports: [
        CommonModule,
        HeadQuarterRoutingModule,
        ReactiveFormsModule
    ]
})
export class HeadQuarterModule { }
