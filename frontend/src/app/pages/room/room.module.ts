import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import {RoomRoutingModule} from "./room-routing.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
    imports: [
        CommonModule,
        RoomRoutingModule,
        ReactiveFormsModule
    ]
})
export class RoomModule { }
