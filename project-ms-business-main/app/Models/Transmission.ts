import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
} from "@ioc:Adonis/Lucid/Orm";
import Camera from "./Camera";
import ServiceExecution from "./ServiceExecution";

export default class Transmission extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime({ autoCreate: true })
  public start_date: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public end_date: DateTime;

  @column()
  public camera_id: number;

  @column()
  public service_execution_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Camera, {
    foreignKey: "camera_id",
  })
  public camera: BelongsTo<typeof Camera>;

  @belongsTo(() => ServiceExecution, {
    foreignKey: "service_execution_id",
  })
  public serviceExecution: BelongsTo<typeof ServiceExecution>;
}

