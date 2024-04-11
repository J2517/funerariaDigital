import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Sepultura extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public codigo: string

  @column()
  public descripcion: string

  @column()
  public precio: number

  @column()
  public fila: string

  @column()
  public columna: string

  @column()
  public nivel: number

  @column()
  public zona: string

  @column()
  public capacidad: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
