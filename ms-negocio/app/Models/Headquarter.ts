import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Room from './Room'

export default class Headquarter extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public address: string

  @column()
  public telephone: string

  @column()
  public email: string

  @column()
  public description: string

  @column()
  public beneficiary_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @hasMany(() => Room, {
    foreignKey: "room_id",
  })
  public rooms: HasMany<typeof Room>;
}
