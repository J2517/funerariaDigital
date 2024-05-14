Entidades para la creación de ms-negocio

## Jackeline

- usuario - user  

  - idUsuario- user
  - email
  - password
  - nombres- name
  - apellidos- lastName
  - celular- number
  - ciudadResidencia- city
  - direccion- address
  - idRol fk- role

- rol - role

  - idRol- idrole
  - nombre- name
  - detalles-

- permiso- permission

  - idPermiso
  - url
  - method

- cliente - se extiende de usuario- customer

  -idCliente
  -tipoCliente

- beneficiario - se extiende de cliente- beneficiary

  - idBeneficiario
  - idTitular

- titular - se extiende de cliente- headline

  - idTitular
  - tipoPlan

- conductor - se extiende de usuario- driver

  - idConductor (fk de idUsuario)
  - idServicio

## Daniel

comentario- comment
chat- chat
mensajes- message
sede- headquarter
sala- room
pago- payment
suscripción- subscription

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

- ejecución de Servicio (service-execution):

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
