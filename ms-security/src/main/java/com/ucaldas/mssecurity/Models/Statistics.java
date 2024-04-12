//Modelo para guardar el numero de errores de validación(No tiene permisos para realizar cambios en la aplicación) y autorización(Error de loguin o contraseña incorrecta)

package com.ucaldas.mssecurity.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document

public class Statistics {

    @DBRef
    private User user;

    public Statistics() {
    }
    
    @Id
    private String _id;
    private int validationErrors;
    private int authorizationErrors;

    public String get_id() {
        return _id;
    }

    public int getValidationErrors() {
        return validationErrors;
    }

    public int getAuthorizationErrors() {
        return authorizationErrors;
    }

    public void setValidationErrors(int validationErrors) {
        this.validationErrors = validationErrors;
    }

    public void setAuthorizationErrors(int authorizationErrors) {
        this.authorizationErrors = authorizationErrors;
    }
}
