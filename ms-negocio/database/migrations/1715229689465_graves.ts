import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'graves'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('code').notNullable()
      table.string('description').notNullable()
      table.decimal('price', 10, 2).notNullable()
      table.string('row').notNullable()
      table.string('column').notNullable()
      table.integer('level').notNullable()
      table.string('zone').notNullable()
      table.integer('capacity').notNullable()
      table.integer('service_id').unsigned().references('services.id').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}