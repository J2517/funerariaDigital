import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Grave extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public code: string

  @column()
  public description: string

  @column()
  public price: number

  @column()
  public row: string

  @column()
  public column: string

  @column()
  public level: number

  @column()
  public zone: string

  @column()
  public capacity: number

  @column()
  public service_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
