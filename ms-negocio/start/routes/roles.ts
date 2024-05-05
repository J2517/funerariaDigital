import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/", "RolesController.index");
    Route.post("/", "RolesController.store");
    Route.get("/:id", "RolesController.show");
    Route.put("/:id", "RolesController.update");
    Route.delete("/:id", "RolesController.destroy");
})
