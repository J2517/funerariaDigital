import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "services_execution";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.dateTime("date").notNullable();
      table.string("description", 255).notNullable();
      table.decimal("price", 10, 2).notNullable();
      table.integer("service_id").unsigned().references("services.id");
      table.integer("user_id").unsigned().references("users.id");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
