import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Roles extends BaseSchema {
  protected tableName = 'roles';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.string('description', 255).notNullable();
      table.dateTime('created_at').notNullable().defaultTo(this.now());
      table.dateTime('updated_at').notNullable().defaultTo(this.now());
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
