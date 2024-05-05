import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'graves'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('code', 255).notNullable()
      table.string('description', 255).notNullable()
      table.decimal('price', 10, 2).notNullable()
      table.string('row', 255).notNullable()
      table.string('column', 255).notNullable()
      table.integer('level').notNullable()
      table.string('zone', 255).notNullable()
      table.integer('capacity').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
