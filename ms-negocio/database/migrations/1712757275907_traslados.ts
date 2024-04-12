import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'traslados'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('origen', 255).notNullable()
      table.string('destino', 255).notNullable()
      table.dateTime('fecha').notNullable()
      table.string('descripcion', 255).notNullable()
      table.decimal('costo', 10, 2).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
