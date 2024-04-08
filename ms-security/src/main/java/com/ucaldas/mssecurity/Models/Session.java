/*acá se realizará la segunda parte de la autenticacion para el loguin donde se consumirá una API creada con python que se encarga de el envío de correos electronicos*/
package com.ucaldas.mssecurity.Models;

import lombok.Data;
import java.util.Date;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document

public class Session {
    
    @DBRef
    private User user;

    public Session() {
    }

    @Id
    private String _id;
    private int token2FA;
    private String token;
    private Date startAt;
    private Date endAt;

    public String get_id() {
        return _id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getStartAt() {
        return startAt;
    }

    public void setStartAt(Date startAt) {
        this.startAt = startAt;
    }

    public Date getEndAt() {
        return endAt;
    }

    public void setEndAt(Date endAt) {
        this.endAt = endAt;
    }

    public int getToken2FA() {
        return token2FA;
    }

    public void setToken2FA(int token2FA) {
        this.token2FA = token2FA;
    }

}
