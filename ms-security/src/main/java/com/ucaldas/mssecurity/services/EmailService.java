/*notificar al usuario el inico de sesion (SecurityController) */

package com.ucaldas.mssecurity.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import java.util.Random;

@Service
public class EmailService {
    private RestTemplate theRestTemplate;

    @Autowired
    public EmailService(RestTemplate theRestTemplate) {
        this.theRestTemplate = theRestTemplate;
    }

    public void sendEmail(String email, String subject, String message) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String code = generateRandomCode(6);
        String json = String.format("{\"email\":\"%s\", \"subject\":\"%s\", \"message\":\"%s\", \"code\":\"%s\"}", email, subject,
                message, code);
        HttpEntity<String> request = new HttpEntity<>(json, headers);
        this.theRestTemplate.postForObject("http://127.0.0.1:5000/send-email", request, String.class);
    }

    private String generateRandomCode(int length) {
        Random random = new Random();
        StringBuilder code = new StringBuilder();
        for (int i = 0; i < length; i++) {
            code.append(random.nextInt(10));
        }
        return code.toString();
    }
}