/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});

Route.get("/users","UsersController.index");
Route.post("/users","UsersController.store");
Route.get("/users/:id","UsersController.show");
Route.put("/users/:id","UsersController.update");
Route.delete("/users/:id","UsersController.destroy");

Route.get("/administrators","AdministratorsController.index");
Route.post("/administrators","AdministratorsController.store");
Route.get("/administrators/:id","AdministratorsController.show");
Route.put("/administrators/:id","AdministratorsController.update");
Route.delete("/administrators/:id","AdministratorsController.destroy");

Route.get("/beneficiaries","BeneficiarysController.index");
Route.post("/beneficiaries","BeneficiarysController.store");
Route.get("/beneficiaries/:id","BeneficiarysController.show");
Route.put("/beneficiaries/:id","BeneficiarysController.update");
Route.delete("/beneficiaries/:id","BeneficiarysController.destroy");

Route.get("/chats", "ChatsController.index");
Route.post("/chats", "ChatsController.store");
Route.get("/chats/:id", "ChatsController.show");
Route.put("/chats/:id", "ChatsController.update");
Route.delete("/chats/:id", "ChatsController.destroy");

Route.get("/customers","CustomersController.index");
Route.post("/customers","CustomersController.store");
Route.get("/customers/:id","CustomersController.show");
Route.put("/customers/:id","CustomersController.update");
Route.delete("/customers/:id","CustomersController.destroy");

Route.get("/comments","CommentsController.index");
Route.post("/comments","CommentsController.store");
Route.get("/comments/:id","CommentsController.show");
Route.put("/comments/:id","CommentsController.update");
Route.delete("/comments/:id","CommentsController.destroy");

Route.get("/drivers","DriversController.index");
Route.post("/drivers","DriversController.store");
Route.get("/drivers/:id","DriversController.show");
Route.put("/drivers/:id","DriversController.update");
Route.delete("/drivers/:id","DriversController.destroy");

Route.get("/cremations","CremationsController.index");
Route.post("/cremations","CremationsController.store");
Route.get("/cremations/:id","CremationsController.show");
Route.put("/cremations/:id","CremationsController.update");
Route.delete("/cremations/:id","CremationsController.destroy");

Route.get("/service_executions","ServiceExecutionsController.index");
Route.post("/service_executions","ServiceExecutionsController.store");
Route.get("/service_executions/:id","ServiceExecutionsController.show");
Route.put("/service_executions/:id","ServiceExecutionsController.update");
Route.delete("/service_executions/:id","ServiceExecutionsController.destroy");

Route.get("/messages","MessagesController.index");
Route.post("/messages","MessagesController.store");
Route.get("/messages/:id","MessagesController.show");
Route.put("/messages/:id","MessagesController.update");
Route.delete("/messages/:id","MessagesController.destroy");

Route.get("/payments","PaymentsController.index");
Route.post("/payments","PaymentsController.store");
Route.get("/payments/:id","PaymentsController.show");
Route.put("/payments/:id","PaymentsController.update");
Route.delete("/payments/:id","PaymentsController.destroy");

Route.get("/permissions","PermissionsController.index");
Route.post("/permissions","PermissionsController.store");
Route.get("/permissions/:id","PermissionsController.show");
Route.put("/permissions/:id","PermissionsController.update");
Route.delete("/permissions/:id","PermissionsController.destroy");

Route.get("/plans","PlansController.index");
Route.post("/plans","PlansController.store");
Route.get("/plans/:id","PlansController.show");
Route.put("/plans/:id","PlansController.update");
Route.delete("/plans/:id","PlansController.destroy");

Route.get("/roles", "RolesController.index");
Route.post("/roles", "RolesController.store");
Route.get("/roles/:id", "RolesController.show");
Route.put("/roles/:id", "RolesController.update");
Route.delete("/roles/:id", "RolesController.destroy");

Route.get("/rooms","RoomsController.index");
Route.post("/rooms","RoomsController.store");
Route.get("/rooms/:id","RoomsController.show");
Route.put("/rooms/:id","RoomsController.update");
Route.delete("/rooms/:id","RoomsController.destroy");

Route.get("/headquarters","HeadquartersController.index");
Route.post("/headquarters","HeadquartersController.store");
Route.get("/headquarters/:id","HeadquartersController.show");
Route.put("/headquarters/:id","HeadquartersController.update");
Route.delete("/headquarters/:id","HeadquartersController.destroy");

Route.get("/headlines","HeadlinesController.index");
Route.post("/headlines","HeadlinesController.store");
Route.get("/headlines/:id","HeadlinesController.show");
Route.put("/headlines/:id","HeadlinesController.update");
Route.delete("/headlines/:id","HeadlinesController.destroy");

Route.get("/services","ServicesController.index");
Route.post("/services","ServicesController.store");
Route.get("/services/:id","ServicesController.show");
Route.put("/services/:id","ServicesController.update");
Route.delete("/services/:id","ServicesController.destroy");

Route.get("/subscriptions","SubscriptionsController.index");
Route.post("/subscriptions","SubscriptionsController.store");
Route.get("/subscriptions/:id","SubscriptionsController.show");
Route.put("/subscriptions/:id","SubscriptionsController.update");
Route.delete("/subscriptions/:id","SubscriptionsController.destroy");

Route.get("/graves","GravesController.index");
Route.post("/graves","GravesController.store");
Route.get("/graves/:id","GravesController.show");
Route.put("/graves/:id","GravesController.update");
Route.delete("/graves/:id","GravesController.destroy");

Route.get("/transfers","TransfersController.index");
Route.post("/transfers","TransfersController.store");
Route.get("/transfers/:id","TransfersController.show");
Route.put("/transfers/:id","TransfersController.update");
Route.delete("/transfers/:id","TransfersController.destroy");
