import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";

export default class Asiento extends BaseModel {
  public static table = "asientos";

  @column({ isPrimary: true })
  public id: number;

  @column()
  public salaId: number;

  @column()
  public codigo: string;


  @column.dateTime({ autoCreate: true })
  public creadoEn: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public actualizadoEn: DateTime;
}
