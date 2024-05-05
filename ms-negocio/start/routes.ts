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

Route.get("/usuarios", "UsuariosController.index");
Route.post("/usuarios", "UsuariosController.store");
Route.get("/usuarios/:id", "UsuariosController.show");
Route.put("/usuarios/:id", "UsuariosController.update");
Route.delete("/usuarios/:id", "UsuariosController.destroy");

Route.get("/administradores", "AdministradoresController.index");
Route.post("/administradores", "AdministradoresController.store");
Route.get("/administradores/:id", "AdministradoresController.show");
Route.put("/administradores/:id", "AdministradoresController.update");
Route.delete("/administradores/:id", "AdministradoresController.destroy");

Route.get("/beneficiarios", "BeneficiariosController.index");
Route.post("/beneficiarios", "BeneficiariosController.store");
Route.get("/beneficiarios/:id", "BeneficiariosController.show");
Route.put("/beneficiarios/:id", "BeneficiariosController.update");
Route.delete("/beneficiarios/:id", "BeneficiariosController.destroy");

Route.get("/chats", "ChatsController.index");
Route.post("/chats", "ChatsController.store");
Route.get("/chats/:id", "ChatsController.show");
Route.put("/chats/:id", "ChatsController.update");
Route.delete("/chats/:id", "ChatsController.destroy");

Route.get("/clientes", "ClientesController.index");
Route.post("/clientes", "ClientesController.store");
Route.get("/clientes/:id", "ClientesController.show");
Route.put("/clientes/:id", "ClientesController.update");
Route.delete("/clientes/:id", "ClientesController.destroy");

Route.get("/comentarios", "ComentariosController.index");
Route.post("/comentarios", "ComentariosController.store");
Route.get("/comentarios/:id", "ComentariosController.show");
Route.put("/comentarios/:id", "ComentariosController.update");
Route.delete("/comentarios/:id", "ComentariosController.destroy");

Route.get("/conductores", "ConductoresController.index");
Route.post("/conductores", "ConductoresController.store");
Route.get("/conductores/:id", "ConductoresController.show");
Route.put("/conductores/:id", "ConductoresController.update");
Route.delete("/conductores/:id", "cremacionesController.destroy");

Route.get("/cremaciones", "CremacionesController.index");
Route.post("/cremaciones", "CremacionesController.store");
Route.get("/cremaciones/:id", "CremacionesController.show");
Route.put("/cremaciones/:id", "CremacionesController.update");
Route.delete("/cremaciones/:id", "CremacionesController.destroy");

Route.get("/ejecucionServicios", "EjecucionServiciosController.index");
Route.post("/ejecucionServicios", "EjecucionServiciosController.store");
Route.get("/ejecucionServicios/:id", "EjecucionServiciosController.show");
Route.put("/ejecucionServicios/:id", "EjecucionServiciosController.update");
Route.delete("/ejecucionServicios/:id", "EjecucionServiciosController.destroy");

Route.get("/mensajes", "MensajesController.index");
Route.post("/mensajes", "MensajesController.store");
Route.get("/mensajes/:id", "MensajesController.show");
Route.put("/mensajes/:id", "MensajesController.update");
Route.delete("/mensajes/:id", "MensajesController.destroy");

Route.get("/pagos", "PagosController.index");
Route.post("/pagos", "PagosController.store");
Route.get("/pagos/:id", "PagosController.show");
Route.put("/pagos/:id", "PagosController.update");
Route.delete("/pagos/:id", "PagosController.destroy");

Route.get("/permisos", "PermisosController.index");
Route.post("/permisos", "PermisosController.store");
Route.get("/permisos/:id", "PermisosController.show");
Route.put("/permisos/:id", "PermisosController.update");
Route.delete("/permisos/:id", "PermisosController.destroy");

Route.get("/planes", "PlanesController.index");
Route.post("/planes", "PlanesController.store");
Route.get("/planes/:id", "PlanesController.show");
Route.put("/planes/:id", "PlanesController.update");
Route.delete("/planes/:id", "PlanesController.destroy");

Route.get("/roles", "RolesController.index");
Route.post("/roles", "RolesController.store");
Route.get("/roles/:id", "RolesController.show");
Route.put("/roles/:id", "RolesController.update");
Route.delete("/roles/:id", "RolesController.destroy");

Route.get("/salas", "SalasController.index");
Route.post("/salas", "SalasController.store");
Route.get("/salas/:id", "SalasController.show");
Route.put("/salas/:id", "SalasController.update");
Route.delete("/salas/:id", "SalasController.destroy");

Route.get("/sedes", "SedesController.index");
Route.post("/sedes", "SedesController.store");
Route.get("/sedes/:id", "SedesController.show");
Route.put("/sedes/:id", "SedesController.update");
Route.delete("/sedes/:id", "SedesController.destroy");

Route.get("/sepulturas", "SepulturasController.index");
Route.post("/sepulturas", "SepulturasController.store");
Route.get("/sepulturas/:id", "SepulturasController.show");
Route.put("/sepulturas/:id", "SepulturasController.update");
Route.delete("/sepulturas/:id", "SepulturasController.destroy");

Route.get("/servicios", "ServiciosController.index");
Route.post("/servicios", "ServiciosController.store");
Route.get("/servicios/:id", "ServiciosController.show");
Route.put("/servicios/:id", "ServiciosController.update");
Route.delete("/servicios/:id", "ServiciosController.destroy");

Route.get("/suscripciones", "SuscripcionesController.index");
Route.post("/suscripciones", "SuscripcionesController.store");
Route.get("/suscripciones/:id", "SuscripcionesController.show");
Route.put("/suscripciones/:id", "SuscripcionesController.update");
Route.delete("/suscripciones/:id", "SuscripcionesController.destroy");

Route.get("/titulares", "TitularesController.index");
Route.post("/titulares", "TitularesController.store");
Route.get("/titulares/:id", "TitularesController.show");
Route.put("/titulares/:id", "TitularesController.update");
Route.delete("/titulares/:id", "TitularesController.destroy");

Route.get("/traslados", "TrasladosController.index");
Route.post("/traslados", "TrasladosController.store");
Route.get("/traslados/:id", "TrasladosController.show");
Route.put("/traslados/:id", "TrasladosController.update");
Route.delete("/traslados/:id", "TrasladosController.destroy");
