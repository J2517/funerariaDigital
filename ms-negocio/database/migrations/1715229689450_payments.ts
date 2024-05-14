import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'payments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.decimal('amount').notNullable()
      table.string('method').notNullable()
      table.string('reference').notNullable()
      table.string('description').nullable()
      table.dateTime('date').notNullable()
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('subscription_id').unsigned().references('subscriptions.id').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}