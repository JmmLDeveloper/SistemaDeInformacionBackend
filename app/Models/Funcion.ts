import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Sala from './Sala'
import Pelicula from './Pelicula'

export default class Funcion extends BaseModel {
  public static table = 'funciones'

  @column({ isPrimary: true })
  public id: number


  @column()
  public peliculaId

  @column()
  public salaId

  @column()
  public comienzo : DateTime

  @column()
  public final : DateTime


  @belongsTo( ()=>Sala )
  public sala : BelongsTo<typeof Sala>

  @belongsTo( ()=>Pelicula )
  public pelicula : BelongsTo<typeof Pelicula>

  @column.dateTime({ autoCreate: true })
  public creadoEn: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public actualizadoEn: DateTime
}
