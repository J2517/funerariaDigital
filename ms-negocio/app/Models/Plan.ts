import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'
import Customer from './Customer'
 
export default class Plan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public price: number

  @column()
  public description: string

  @column()
  public duration: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Service, {
    pivotTable: "planServices",
    pivotForeignKey: "plan_id",
    pivotRelatedForeignKey: "service_id",
    pivotColumns: [],
  })
  public services: ManyToMany<typeof Service>;

  @manyToMany(() => Customer, {
    pivotTable: "subscriptions",
    pivotForeignKey: "plan_id",
    pivotRelatedForeignKey: "customer_id",
    pivotColumns: [],
  })
  public customers: ManyToMany<typeof Customer>;
}
