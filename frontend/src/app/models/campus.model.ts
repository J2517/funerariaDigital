import {ListComponent} from "../pages/hall/list/list.component"
export class Campus {
  id?:string;
  name:string;
  location:string;
  Email:string;
  city:City;
  salas:ListComponent;

  public addHall(): void{
  }

  public deleteHall(): void{
  }
}