import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'funciones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.dateTime('comienzo').notNullable()
      table.dateTime('final').notNullable()

      table.integer('pelicula_id').unsigned().notNullable().references('id').inTable('peliculas')
      table.integer('sala_id').unsigned().notNullable().references('id').inTable('salas')
      
      table.timestamp('creado_en').defaultTo(this.now()) 
      table.timestamp('actualizado_en').defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
