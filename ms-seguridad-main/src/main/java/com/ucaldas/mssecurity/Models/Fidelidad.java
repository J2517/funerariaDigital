package com.ucaldas.mssecurity.Models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Fidelidad {
    @Id
    private String _id;
    private int puntos = 20;

    public Fidelidad() {
    }

    public Fidelidad(int puntos) {
        this.puntos = puntos;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public int getPuntos() {
        return puntos;
    }

    public void setPuntos(int puntos) {
        this.puntos = puntos;
    }
}
