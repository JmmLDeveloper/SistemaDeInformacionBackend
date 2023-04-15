import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Articulo extends BaseModel {
  public static table = 'articulos'

  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre : string 

  @column() 
  public descripcion: string

  @column() 
  public imagen: string

  @column() 
  public precio: number


  @column.dateTime({ autoCreate: true })
  public creadoEn: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public actualizadoEn: DateTime
}
