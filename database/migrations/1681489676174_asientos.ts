import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'asientos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')


      table.integer('sala_id').unsigned().notNullable().references('id').inTable('salas')

      table.string('codigo').notNullable()
      table.timestamp('creado_en').defaultTo(this.now()) 
      table.timestamp('actualizado_en').defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
