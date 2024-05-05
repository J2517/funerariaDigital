import {Campus} from "./campus.model";
import {ListComponent} from "../pages/campus/list/list.component"
import {ListComponentGrave} from "../pages/grave/list/list.component"

export class Hall {
  id?:string;
  name:string;
  capacity:number;
  disponible:boolean;
  campus:Campus;
  cremations:ListComponent;
  graves:ListComponentGrave;
}
