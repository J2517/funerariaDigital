/*acá se realizará la segunda parte de la autenticacion para el loguin donde se consumirá una API creada con python que se encarga de el envío de correos electronicos*/
package com.ucaldas.mssecurity.Models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document

public class Session {
    @Id
    private String _id;
    private String token;
    private String expiration;
    private String startAt;
    private String endAt;

    public Session(String token, String expiration, String startAt, String endAt) {
        this.token = token;
        this.expiration = expiration;
        this.startAt = startAt;
        this.endAt = endAt;
    }

    public String get_id() {
        return _id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getExpiration() {
        return expiration;
    }

    public void setExpiration(String expiration) {
        this.expiration = expiration;
    }

    public String getStartAt() {
        return startAt;
    }

    public void setStartAt(String startAt) {
        this.startAt = startAt;
    }

    public String getEndAt() {
        return endAt;
    }

    public void setEndAt(String endAt) {
        this.endAt = endAt;
    }

}
