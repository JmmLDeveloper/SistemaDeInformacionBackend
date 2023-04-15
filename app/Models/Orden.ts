import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  HasMany,
  belongsTo,
  column,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Funcion from "./Funcion";
import ArticuloOrden from "./ArticuloOrden";

import AsientoOrden from "./AsientoOrden";

export default class Orden extends BaseModel {
  public static table = "ordenes";

  @column({ isPrimary: true })
  public id: number;

  @column({serializeAs:null})
  public identificadorQr: string | null;

  @column()
  public funcionId: number;

  @column()
  public comidaEsValido: boolean;

  @column()
  public boletosEsValido: boolean;

  @belongsTo(() => Funcion)
  public funcion: BelongsTo<typeof Funcion>;

  @hasMany(() => ArticuloOrden)
  public articulos: HasMany<typeof ArticuloOrden>;

  @hasMany(() => AsientoOrden)
  public asientos: HasMany<typeof AsientoOrden>;



  @column.dateTime({ autoCreate: true })
  public creadoEn: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public actualizadoEn: DateTime;
}
