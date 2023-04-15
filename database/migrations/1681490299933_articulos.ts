import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'articulos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      
      table.string('imagen').notNullable()
      table.string('nombre').notNullable()
      table.integer('precio').notNullable() // en alguna fraccion de moneda como centavos o bolivares
      table.string('descripcion').notNullable()



      table.timestamp('creado_en').defaultTo(this.now()) 
      table.timestamp('actualizado_en').defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
