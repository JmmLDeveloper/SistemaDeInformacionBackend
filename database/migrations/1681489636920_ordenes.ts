import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'ordenes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('funcion_id').unsigned().notNullable().references('id').inTable('funciones')      

      table.boolean('comida_es_valido').defaultTo(true)
      table.boolean('boletos_es_valido').defaultTo(true)

      table.string('identificador_qr',256).notNullable()
      table.timestamp('creado_en').defaultTo(this.now()) 
      table.timestamp('actualizado_en').defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
