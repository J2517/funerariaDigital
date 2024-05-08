import { DateTime } from "luxon";
import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Beneficiary from "./Beneficiary";

export default class Headline extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public email: string;

  @column()
  public password: string;

  @hasMany(() => Beneficiary, {
    foreignKey: "accountHolder_id",
  })
  public beneficiaries: HasMany<typeof Beneficiary>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
