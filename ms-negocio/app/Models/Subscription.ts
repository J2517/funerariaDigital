import { DateTime } from "luxon";
import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Payment from "./Payment";

export default class Subcription extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @column()
  public planId: number;

  @column()
  public start_date: DateTime;

  @column()
  public end_date: DateTime;

  @column()
  public status: boolean;

  @hasMany(() => Payment, {
    foreignKey: "subscription_id",
  })
  public payments: HasMany<typeof Payment>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
