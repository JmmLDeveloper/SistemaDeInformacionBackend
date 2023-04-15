import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Articulo from './Articulo'

export default class ArticuloOrden extends BaseModel {
  public static table = 'articulo_orden_detalles'

  @column({ isPrimary: true })
  public id: number

  @column() 
  public articuloId: number

  @column()
  public ordenId: number

  @column()
  public estadoId: number

  @column()
  public cantidad: number


  @belongsTo( ()=> Articulo )
  public articulo : BelongsTo<typeof Articulo>

  @column.dateTime({ autoCreate: true })
  public creadoEn: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public actualizadoEn: DateTime
}
