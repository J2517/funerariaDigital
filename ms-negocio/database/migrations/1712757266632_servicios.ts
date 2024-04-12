import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'servicios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('nombre', 255).notNullable()
      table.string('descripcion', 255).notNullable()
      table.decimal('costo', 10, 2).notNullable()
      table.integer('duracion').notNullable()
      table.boolean('estado').notNullable()
      table.string('tipo', 255).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
