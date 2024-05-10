import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  public id: number
 
  @column()
  public url: string

  @column()
  public method: string

  @manyToMany(() => Role, {
    pivotTable: "rolePermissions",
    pivotForeignKey: "permission_id",
    pivotRelatedForeignKey: "role_id",
    pivotColumns: [],
  })
  public roles: ManyToMany<typeof Role>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
