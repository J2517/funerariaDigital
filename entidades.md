Entidades para la creación de ms-negocio

## Jackeline

<<<<<<< HEAD
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
=======
- usuario (user):

  - id
  - name
  - email
  - password
  - role_id

- rol (role):

  - id
  - name
  - description

- permiso (permission):
>>>>>>> d2ccd1f8b74c6f1850c56548b182ebc571e70887

  - id
  - url
  - method

<<<<<<< HEAD
- cliente - se extiende de usuario- customer
=======
- cliente (customer)- se extiende de usuario:
>>>>>>> d2ccd1f8b74c6f1850c56548b182ebc571e70887

  - id
  - type_customer
  - user_id

<<<<<<< HEAD
- beneficiario - se extiende de cliente- beneficiary
=======
- beneficiario (beneficiary) - se extiende de cliente:
>>>>>>> d2ccd1f8b74c6f1850c56548b182ebc571e70887

  - id
  - accountHolder_id
  - user_id

<<<<<<< HEAD
- titular - se extiende de cliente- headline
=======
- titular (headline) - se extiende de cliente:
>>>>>>> d2ccd1f8b74c6f1850c56548b182ebc571e70887

  - id
  - tipoPlan
  - user_id

<<<<<<< HEAD
- conductor - se extiende de usuario- driver
=======
- conductor (driver) - se extiende de usuario:
>>>>>>> d2ccd1f8b74c6f1850c56548b182ebc571e70887

  - id
  - licencia
  - user_id

## Daniel

<<<<<<< HEAD
comentario- comment
chat- chat
mensajes- message
sede- headquarter
sala- room
pago- payment
suscripción- subscription
=======
- comentario (comment):

 - id
 - content
 - service_execute_id
 - user_id
 
- chat (chat):

 - id
 - message
 - service_execute_id
 
- mensaje (message):

 - id 
 - content
 - user_id
 
- sede (headquarter):

 - name
 - address
 - telephone
 - email
 - description
 - beneficiary_id
 
- sala (room):

 - id
 - name
 - capacity
 - status
 - description
  

- pago (payment):

 - id
 - amount
 - method
 - reference
 - description
 - date
 - beneficiary_id
 
- suscripción (subscription):

  - id
  - start_date
  - end_date
  - customer_id
  - plan_id

>>>>>>> d2ccd1f8b74c6f1850c56548b182ebc571e70887

## Juan Manuel

- administrador (administrator):

 - id
 - user_id

- plan (plan):

 - id
 - name
 - price
 - description
 - duration

- servicio (service):

 - id
 - name
 - description
 - price
 - duration
 - status
 - type

- traslado (transfer):

 - id
 - origin
 - destination
 - date
 - description
 - price

- ejecución de Servicio (service-execution):

 - id
 - date
 - description
 - price
 - service_id
 - user_id


- sepultura (grave):

 - id 
 - code
 - descrption
 - price
 - row
 - column
 - level
 - zone
 - capacity
  

- cremación (cremation):

 - id 
 - name_deceased
 - date
 - place
 - description
