package com.ucaldas.mssecurity.services;

import com.ucaldas.mssecurity.Models.Session;
import com.ucaldas.mssecurity.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class EmailService {

    @Autowired
    private SessionService theSessionService;

    @Value("${notifications.baseurl}")
    private String emailServiceUrl;

    // Método para enviar correo electrónico para la autenticación de dos factores (2FA)
    public void send2FAEmail(User user, Session session) {
        Map<String, Object> emailContent = new HashMap<>();
        emailContent.put("address", user.getEmail());
        emailContent.put("subject", "Su token de 2FA");
        emailContent.put("plainText", "Su token es: " + session.getToken2FA());

        sendEmail(emailContent);
    }

    // Método para enviar correo electrónico para restablecimiento de contraseña
    public void sendPasswordResetEmail(String email, String Token) {
        Map<String, Object> emailContent = new HashMap<>();
        emailContent.put("address", email);
        emailContent.put("subject", "Restablecimiento de contraseña");
        emailContent.put("plainText", "Hemos recibido una solicitud para restablecer tu contraseña. Por favor, copia el siguiente TOKEN para restablecer su contraseña:\n\n"
                + "TOKEN = " + Token + "\n\n"
                + "Si no solicitaste un restablecimiento de contraseña, ignora este mensaje o contactate con soporte.\n\n");

        sendEmail(emailContent);
    }

    // Método genérico para enviar correo electrónico
    public void sendEmail(Map<String, Object> emailContent) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(emailContent, headers);

        restTemplate.postForObject(emailServiceUrl, entity, String.class);
    }

    // Método para generar y enviar token de 2FA
    public String generateAndSend2FA(User user, String token) {
        Session theSession = theSessionService.createSession(user, token);

        if (theSession != null) {
            send2FAEmail(user, theSession);
            return theSession.getToken();
        } else {
            return "";
        }
    }
}