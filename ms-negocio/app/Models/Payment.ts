import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Payment extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public amount: number;

  @column()
  public method: string;

  @column()
  public reference: string;

  @column()
  public description: string;

  @column()
  public date: DateTime;

  @column()
  public subscription_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
