import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/:id", "TransmissionsController.find");
  Route.post("/", "TransmissionsController.create");
}).prefix("/transmissions");
