import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Pago extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cantidad: number

  @column()
  public metodo: string

  @column()
  public referencia: string

  @column()
  public descripcion: string

  @column()
  public fecha: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
