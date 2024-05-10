import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "beneficiaries";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name", 60).notNullable();
      table.string("email", 254).notNullable();
      table.string("password", 256).notNullable().unique();
      table
        .integer("accountHolder_id")
        .unsigned()
        .references("headlines.id")
        .onDelete("CASCADE");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
