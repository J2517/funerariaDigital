Entidades para la creación de ms-negocio

## Jackeline

- usuario

  - idUsuario
  - email
  - password
  - nombres
  - apellidos
  - celular
  - ciudadResidencia
  - direccion
  - idRol fk

- rol

  - idRol
  - nombre
  - detalles

- permiso

  - idPermiso
  - url
  - method

- cliente - se extiende de usuario
  -idCliente
  -tipoCliente
- beneficiario - se extiende de cliente

  - idBeneficiario
  - idTitular

- titular - se extiende de cliente

  - idTitular
  - tipoPlan

- conductor - se extiende de usuario
  - idConductor (fk de idUsuario)
  - idServicio

## Daniel

comentario
chat
mensajes
sede
sala
pago
suscripción

## Juan Manuel

administrador
plan
servicio
traslado
ejecucionservicio
sepultura
cremacion
