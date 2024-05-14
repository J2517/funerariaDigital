Entidades para la creación de ms-negocio

## Jackeline

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

  - id
  - url
  - method

- cliente (customer)- se extiende de usuario:

  - id
  - type_customer
  - user_id

- beneficiario (beneficiary) - se extiende de cliente:

  - id
  - accountHolder_id
  - user_id

- titular (headline) - se extiende de cliente:

  - id
  - tipoPlan
  - user_id

- conductor (driver) - se extiende de usuario:

  - id
  - licencia
  - user_id

## Daniel

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
