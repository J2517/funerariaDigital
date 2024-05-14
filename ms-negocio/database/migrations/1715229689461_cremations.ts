import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'cremations';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name_deceased', 255).notNullable();
      table.dateTime('date').notNullable();
      table.string('place', 255).notNullable();
      table.string('description', 255).notNullable();
      table.integer('service_id').unsigned().references('services.id').onDelete('CASCADE');
      table.timestamps(true, true);
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}

