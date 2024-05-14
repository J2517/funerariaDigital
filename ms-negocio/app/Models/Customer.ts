import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Plan from './Plan'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type_customer: string

  @column()
  public user_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Plan, {
    pivotTable: "subscriptions",
    pivotForeignKey: "customer_id",
    pivotRelatedForeignKey: "plan_id",
    pivotColumns: [],
  })
  public plans: ManyToMany<typeof Plan>;
}
