import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'asiento_orden_detalles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')


      table.integer('orden_id').unsigned().notNullable().references('id').inTable('ordenes')
      table.integer('asiento_id').unsigned().notNullable().references('id').inTable('asientos')
      table.timestamp('creado_en').defaultTo(this.now()) 
      table.timestamp('actualizado_en').defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
