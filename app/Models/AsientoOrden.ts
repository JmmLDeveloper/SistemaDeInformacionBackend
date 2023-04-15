import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Asiento from './Asiento'

export default class AsientoOrden extends BaseModel {
  public static table = 'asiento_orden_detalles'

  @column({ isPrimary: true })
  public id: number

  @column()
  public ordenId: number

  @column()
  public asientoId: number

  @belongsTo(() => Asiento)
  public asiento: BelongsTo<typeof Asiento>;


  @column.dateTime({ autoCreate: true })
  public creadoEn: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public actualizadoEn: DateTime
}
