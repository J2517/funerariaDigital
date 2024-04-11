package com.ucaldas.mssecurity.services;

import java.security.SecureRandom;

import org.springframework.stereotype.Service;

@Service
public class PasswordService {
    public static String generateToken() {
        SecureRandom random = new SecureRandom();
        int token = 100000 + random.nextInt(900000); // Esto garantiza que el token siempre tenga 6 dígitos
        return String.valueOf(token);
    }
}

