import { DateTime } from "luxon";
import {
  BaseModel,
  ManyToMany,
  column,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Service from "./Service";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public email: string;

  @column()
  public password: string;

  @column()
  public role_id: number;

  @manyToMany(() => Service, {
    pivotTable: "servicesExecutions",
    pivotForeignKey: "user_id",
    pivotRelatedForeignKey: "service_id",
    pivotColumns: ["date", "description", "price"],
  })
  public services: ManyToMany<typeof Service>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
