import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sepulturas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('codigo', 255).notNullable()
      table.string('descripcion', 255).notNullable()
      table.decimal('precio', 10, 2).notNullable()
      table.string('fila', 255).notNullable()
      table.string('columna', 255).notNullable()
      table.integer('nivel').notNullable()
      table.string('zona', 255).notNullable()
      table.integer('capacidad').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
