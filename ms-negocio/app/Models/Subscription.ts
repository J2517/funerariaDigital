import { DateTime } from "luxon";
import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Payment from "./Payment";

export default class Subscription extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime({autoCreate: true})
  public start_date: DateTime;

  @column.dateTime({autoCreate: true})
  public end_date: DateTime;

  @column()
  public customer_id: number;

  @column()
  public plan_id: number;

  @hasMany(() => Payment, {
    foreignKey: "subscription_id",
  })
  public payments: HasMany<typeof Payment>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
