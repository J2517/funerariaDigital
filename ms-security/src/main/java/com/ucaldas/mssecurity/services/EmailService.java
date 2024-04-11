package com.ucaldas.mssecurity.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

@Service
public class EmailService {

    private RestTemplate restTemplate;

    @Autowired
    public EmailService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void sendEmail(String email, String subject, String body) {
        // Define la URL de tu API de Python para enviar correos electrónicos
        final String url = "http://localhost:5000/send-email";

        // Crea el objeto de solicitud con los datos del correo
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String json = String.format("{\"email\":\"%s\", \"subject\":\"%s\", \"body\":\"%s\"}", email, subject, body);
        HttpEntity<String> request = new HttpEntity<>(json, headers);

        // Realiza la llamada a la API
        this.restTemplate.postForObject(url, request, String.class);
    }
}
