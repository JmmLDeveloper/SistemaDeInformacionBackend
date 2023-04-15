import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Pelicula extends BaseModel {
  public static table = 'peliculas'

  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre : string


  @column.dateTime({ autoCreate: true })
  public creadoEn: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public actualizadoEn: DateTime
}
