import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Cremacion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombreFallecido: string

  @column()
  public fecha: DateTime

  @column()
  public lugar: string

  @column()
  public descripcion: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
