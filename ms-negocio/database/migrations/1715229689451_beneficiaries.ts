import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'beneficiaries';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('accountHolder_id').unsigned().references('headlines.id').onDelete('CASCADE');
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE'); // Se agrega la referencia a la tabla users
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}