import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'pagos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.decimal('cantidad').notNullable()
      table.string('metodo').notNullable()
      table.string('referencia').notNullable()
      table.string('descripcion').nullable()
      table.dateTime('fecha').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
