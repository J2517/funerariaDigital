import { DateTime } from "luxon";
import { BaseModel, HasMany, ManyToMany, column, hasMany, manyToMany } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import Permission from "./Permission";

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number;
 
  @column()
  public name: string;

  @column()
  public description: string;

  @hasMany(() => User, {
    foreignKey: "role_id",
  })
  public users: HasMany<typeof User>;

  @manyToMany(() => Permission, {
    pivotTable: "rolePermissions",
    pivotForeignKey: "role_id",
    pivotRelatedForeignKey: "permission_id",
    pivotColumns: [],
  })
  public permissions: ManyToMany<typeof Permission>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
