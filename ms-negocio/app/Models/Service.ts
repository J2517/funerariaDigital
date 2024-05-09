import { DateTime } from "luxon";
import {
  BaseModel,
  ManyToMany,
  column,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import Plan from "./Plan";

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number;
 
  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public price: number;

  @column()
  public duration: number;

  @column()
  public status: boolean;

  @column()
  public type: string;

  @manyToMany(() => User, {
    pivotTable: "servicesExecutions",
    pivotForeignKey: "service_id",
    pivotRelatedForeignKey: "user_id",
    pivotColumns: ["date", "description", "price"],
  })
  public users: ManyToMany<typeof User>;

  @manyToMany(() => Plan, {
    pivotTable: "planServices",
    pivotForeignKey: "service_id",
    pivotRelatedForeignKey: "plan_id",
    pivotColumns: [],
  })
  public plans: ManyToMany<typeof Plan>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
