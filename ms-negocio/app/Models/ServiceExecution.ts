import { DateTime } from "luxon";
import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from "@ioc:Adonis/Lucid/Orm";
import Chat from "./Chat";
import Comment from "./Comment";

export default class ServiceExecution extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public date: DateTime;

  @column()
  public description: string;

  @column()
  public price: number;

  @column()
  public service_id: number;

  @column()
  public user_id: number;

  @column.dateTime({ autoCreate: true }) 
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasOne(()=> Chat,{
    foreignKey: 'service_execute_id',
  })
  public chat: HasOne<typeof Chat>

  @hasMany(()=> Comment,{
    foreignKey: 'service_execute_id',
  })
  public comments: HasMany<typeof Comment>
}
