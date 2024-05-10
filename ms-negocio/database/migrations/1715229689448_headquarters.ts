import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'headquarters'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name').notNullable()
      table.string('address').notNullable()
      table.string('telephone').notNullable()
      table.string('email').notNullable()
      table.string('description').nullable()
      table.integer('beneficiary_id').unsigned()
                                           .references('beneficiaries.id')
                                           .onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}