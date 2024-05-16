import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "headlines";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
<<<<<<< HEAD
      table.string("tipo_plan").notNullable();
=======
       table.string("tipo_plan").notNullable();
>>>>>>> de2377a85288e2675aac302b1161fd043a75663a
      table.integer("user_id").unsigned().references("users.id").onDelete("CASCADE");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

