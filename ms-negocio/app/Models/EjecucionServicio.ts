import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class EjecucionServicio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fecha: DateTime

  @column()
  public descripcion: string

  @column()
  public costo: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
