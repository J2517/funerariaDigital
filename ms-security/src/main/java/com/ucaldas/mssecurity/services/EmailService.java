package com.ucaldas.mssecurity.services;

import com.ucaldas.mssecurity.Models.Session;
import com.ucaldas.mssecurity.Models.User;
import ch.qos.logback.classic.Logger;
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

    @Autowired
    private Logger logger; // Suponiendo que tienes un componente para manejar los logs

    // Método para enviar correo electrónico para la autenticación de dos factores (2FA)
    public void send2FAEmail(User user, Session session) {
        Map<String, Object> emailContent = new HashMap<>();
        emailContent.put("address", user.getEmail());
        emailContent.put("subject", "Su token de 2FA");
        emailContent.put("plainText", "Su token es: " + session.getToken2FA());

        try {
            sendEmail(emailContent);
            logger.info("Correo electrónico de 2FA enviado correctamente a {}", user.getEmail());
        } catch (Exception e) {
            logger.error("Error al enviar correo electrónico de 2FA a {}", user.getEmail(), e);
        }
    }

    // Método para enviar correo electrónico para restablecimiento de contraseña
    public void sendPasswordResetEmail(String email, String resetToken) {
        Map<String, Object> emailContent = new HashMap<>();
        emailContent.put("address", email);
        emailContent.put("subject", "Restablecimiento de contraseña");
        emailContent.put("plainText", "Hemos recibido una solicitud para restablecer tu contraseña. Por favor, copia el siguiente TOKEN para restablecer su contraseña:\n\n"
                + "TOKEN = " + resetToken + "\n\n"
                + "Si no solicitaste un restablecimiento de contraseña, ignora este mensaje o contactate con soporte.\n\n");

        try {
            sendEmail(emailContent);
            logger.info("Correo electrónico de restablecimiento de contraseña enviado correctamente a {}", email);
        } catch (Exception e) {
            logger.error("Error al enviar correo electrónico de restablecimiento de contraseña a {}", email, e);
        }
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