import { DateTime } from "luxon";
import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Headquarter from "./Headquarter";

export default class Beneficiary extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public accountHolder_id: number;

  @column()
  public user_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(()=> Headquarter,{
    foreignKey: 'beneficiary_id',
  })
  public headquater: HasMany<typeof Headquarter>
}
