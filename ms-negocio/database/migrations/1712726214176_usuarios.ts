import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "usuarios";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.string("nombre", 60).notNullable();
      table.string("correo", 254).notNullable();
      table.string("contrasena", 256).notNullable().unique();
      table.integer("rolId").unsigned().references("roles.id");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
