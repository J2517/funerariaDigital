import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'subcriptions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.dateTime('start_date').notNullable()
      table.dateTime('end_date').notNullable()
      table.boolean('status').defaultTo(false)
      table.integer('customer_id').unsigned()
                                  .references('movie.id')
                                  .onDelete('CASCADE')
      table.integer('plan_id').unsigned()
                                  .references('plan.id')
                                  .onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
