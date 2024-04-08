package com.ucaldas.mssecurity.services;

import com.ucaldas.mssecurity.Models.User;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private Long expiration;

    // Método para validar si un token JWT de restablecimiento de contraseña es válido y no ha expirado
    @SuppressWarnings("deprecation")
    public boolean validatePasswordToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getSecretKey()).build().parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            System.out.println("El token ha expirado: " + e.getMessage());
            return false;
        } catch (MalformedJwtException | SignatureException e) {
            System.out.println("El token es inválido: " + e.getMessage());
            return false;
        } catch (Exception e) {
            System.out.println("Error al validar el token: " + e.getMessage());
            return false;
        }
    }

    // Método para obtener el correo electrónico del usuario incrustado en el token JWT de restablecimiento de contraseña
    public String getUserIdEmailFromPasswordToken(String token) {
        return Jwts.parserBuilder().setSigningKey(getSecretKey()).build().parseClaimsJws(token).getBody().getSubject();
    }

    // Método privado para obtener la clave secreta
    private SecretKey getSecretKey() {
        return new SecretKeySpec(secretKey.getBytes(), SignatureAlgorithm.HS256.getJcaName());
    }

    // Método para generar un token JWT para autenticación
    public String generateToken(User user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration);

        Map<String, Object> claims = new HashMap<>();
        claims.put("_id", user.get_id());
        claims.put("name", user.getName());
        claims.put("email", user.getEmail());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getName())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getSecretKey())
                .compact();
    }
    
    @SuppressWarnings("deprecation")
    public boolean validateToken(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);

            // Verifica la expiración del token
            Date now = new Date();
            if (claimsJws.getBody().getExpiration().before(now)) {
                return false;
            }

            return true;
        } catch (SignatureException ex) {
            // La firma del token es inválida
            return false;
        } catch (Exception e) {
            // Otra excepción
            return false;
        }
    }


    @SuppressWarnings("deprecation")
    public User getUserFromToken(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);

            Claims claims = claimsJws.getBody();

            User user = new User();
            user.set_id((String) claims.get("_id"));
            user.setName((String) claims.get("name"));
            user.setEmail((String) claims.get("email"));
            return user;
        } catch (Exception e) {
            // En caso de que el token sea inválido o haya expirado
            return null;
        }
    }

    // Método para generar un token de restablecimiento de contraseña
    public String generatePasswordToken(User user) {
        try {
            // Utilizar la misma clave secreta para firmar el token
            SecretKey secretKey = getSecretKey();

            // Fecha y hora actual
            Date now = new Date();

            // Fecha y hora de expiración del token (1 hora desde ahora)
            Date expiryDate = new Date(now.getTime() + 3600000); // 1 hora en milisegundos

            // Construir el token JWT con la información del usuario y la fecha de expiración
            String token = Jwts.builder()
                    .setSubject(user.getEmail()) // Establecer el correo electrónico del usuario como sujeto del token
                    .setIssuedAt(now) // Establecer la fecha y hora de emisión del token
                    .setExpiration(expiryDate) // Establecer la fecha y hora de expiración del token
                    .signWith(secretKey) // Firmar el token con la clave secreta
                    .compact(); // Compactar el token en una cadena

            // Retornar el token generado
            return token;
        } catch (Exception e) {
            // Manejar cualquier excepción que ocurra durante la generación del token
            System.out.println("Error al generar el token de restablecimiento de contraseña: " + e.getMessage());
            return null;
        }
    }

}