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

- administrador (administrator):

- idAdministrador (PK)
- nombres
- apellidos
- email
- password
- celular

- plan (plan):

- idPlan (PK)
- nombre
- descripción
- costo
- duración

- servicio (service):

- idServicio (PK)
- nombre
- descripción
- costo

- traslado (transfer):

- idTraslado (PK)
- origen
- destino
- fecha
- costo

- ejecución de Servicio (service execution):

- idEjecucionServicio (PK)
- idServicio (FK)
- fechaInicio
- fechaFin
- estado

- sepultura (grave):

- idSepultura (PK)
- ubicación
- costo
- ocupada (booleano)

- cremación (cremation):

- idCremacion (PK)
- fecha
- costo
