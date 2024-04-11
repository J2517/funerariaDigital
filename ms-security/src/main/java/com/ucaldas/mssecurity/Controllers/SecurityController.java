// package com.ucaldas.mssecurity.Controllers;

// import com.ucaldas.mssecurity.Models.Session;
// import com.ucaldas.mssecurity.Models.User;
// import com.ucaldas.mssecurity.Repositories.SessionRepository;
// import com.ucaldas.mssecurity.Repositories.UserRepository;
// import com.ucaldas.mssecurity.services.EncryptionService;
// import com.ucaldas.mssecurity.services.JwtService;
// import com.ucaldas.mssecurity.services.EmailService;
// import jakarta.servlet.http.HttpServletResponse;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.Map;

// @CrossOrigin
// @RestController
// @RequestMapping("/api/public/security")
// public class SecurityController {

//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private EncryptionService encryptionService;

//     @Autowired
//     private SessionRepository sessionRepository;

//     @Autowired
//     private JwtService jwtService;

//     @Autowired
//     private EmailService emailService;

//     @PostMapping("login")
//     public ResponseEntity<String> login(@RequestBody User user, HttpServletResponse response) {
//         User actualUser = userRepository.getUserByEmail(user.getEmail());
//         if (actualUser != null && actualUser.getPassword().equals(encryptionService.convertSHA256(user.getPassword()))) {
//             String token = jwtService.generateToken(actualUser);
//             verifyAndSend2FA(actualUser, token);
//             return ResponseEntity.ok(token);
//         } else {
//             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//         }
//     }

//     private void verifyAndSend2FA(User user, String token) {
//         emailService.generateAndSend2FA(user, token); 
//     }

//     @PostMapping("login/2FA/{idUser}")
//     public ResponseEntity<String> login2FA(@RequestBody Session session, @PathVariable String idUser) {
//         Session actualSession = sessionRepository.getSessionByUser(idUser);
//         if (actualSession != null && actualSession.getToken2FA() == session.getToken2FA()) {
//             return ResponseEntity.ok("Conceder acceso.");
//         } else {
//             return ResponseEntity.ok("No permitir entrar.");
//         }
//     }

//     @PostMapping("/forgot-password")
//     public void forgotPassword(@RequestBody Map<String, String> requestBody) {
//         String email = requestBody.get("email");
//         User user = userRepository.getUserByEmail(email);
//         if (user != null) {
//             String resetToken = jwtService.generatePasswordToken(user);
//             emailService.sendPasswordResetEmail(user.getEmail(), resetToken);
//         }
//     }

//     @PostMapping("/reset-password")
//     public void resetPassword(@RequestBody Map<String, String> requestBody) {
//         String resetToken = requestBody.get("token");
//         String newPassword = requestBody.get("newPassword");
//         if (jwtService.validatePasswordToken(resetToken)) {
//             String userEmail = jwtService.getUserIdEmailFromPasswordToken(resetToken);
//             User user = userRepository.getUserByEmail(userEmail);
//             if (user != null) {
//                 user.setPassword(encryptionService.convertSHA256(newPassword));
//                 userRepository.save(user);
//             }
//         }
//     }

//     @PostMapping("/change-password")
//     public ResponseEntity<String> changePassword(@RequestBody Map<String, String> requestBody) {
//         String email = requestBody.get("email");
//         String currentPassword = requestBody.get("currentPassword");
//         String newPassword = requestBody.get("newPassword");

//         User user = userRepository.getUserByEmail(email);
//         if (user != null && user.getPassword().equals(encryptionService.convertSHA256(currentPassword))) {
//             user.setPassword(encryptionService.convertSHA256(newPassword));
//             userRepository.save(user);
//             return ResponseEntity.ok("Contraseña cambiada exitosamente");
//         } else {
//             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
//         }
//     }
// }
//-----------------------------------------------------------------------------------------------------------------
package com.ucaldas.mssecurity.Controllers;

import com.ucaldas.mssecurity.Models.Session;
import com.ucaldas.mssecurity.Models.User;
import com.ucaldas.mssecurity.Repositories.SessionRepository;
import com.ucaldas.mssecurity.Repositories.UserRepository;
import com.ucaldas.mssecurity.services.EmailService;
import com.ucaldas.mssecurity.services.EncryptionService;
import com.ucaldas.mssecurity.services.JwtService;
import com.ucaldas.mssecurity.services.PasswordService;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Date;

@CrossOrigin
@RestController
@RequestMapping("/api/public/security")
public class SecurityController {
    @Autowired
    private UserRepository theUserRepository;
    @Autowired
    private EncryptionService theEncryptionService;
    @Autowired
    private JwtService theJwtService;
    @Autowired
    private EmailService theEmailService;
    @Autowired
    private SessionRepository theSessionRepository;

    // Generar el token 2FA

    @PostMapping("/login")
    public String login(@RequestBody User theUser, final HttpServletResponse response) throws IOException {
        User theActualUser = this.theUserRepository.getUserByEmail(theUser.getEmail());
        if (theActualUser != null &&
                theActualUser.getPassword().equals(theEncryptionService.convertSHA256(theUser.getPassword()))) {
            // Generar token 2FA
            String token2FA = PasswordService.generateToken();

            // Enviar token 2FA por correo
            this.theEmailService.sendEmail(theActualUser.getEmail(), "Código de verificación",
                    "Su código de verificación es: " + token2FA);

            // Crear y guardar la sesión
            Session theUserSession = new Session();
            theUserSession.setUser(theActualUser); // Establece el usuario para la sesión
            theUserSession.setToken2FA(token2FA); // Guarda el token 2FA
            theUserSession.setStartAt(new Date()); // Establece el tiempo actual como inicio
            theUserSession.setEndAt(new Date(System.currentTimeMillis() + (1000 * 60 * 60))); // Establece el tiempo de
                                                                                              // fin, podría ser una
                                                                                              // hora después, por
                                                                                              // ejemplo
            theSessionRepository.save(theUserSession); // Guarda la sesión en la base de datos

            return token2FA;
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Usuario o contraseña incorrecta");
            return null;
        }
    };

    // Verificar token y generar jwt
    @PostMapping("/verify2fa")
    public String verify2FA(@RequestBody Session theSession, final HttpServletResponse response) throws IOException {
        Session theUserSession = this.theSessionRepository.findById(theSession.get_id()).orElse(null);
        if (theUserSession != null && theUserSession.getToken2FA().equals(theSession.getToken2FA())) {
            // Generar token JWT
            String token = this.theJwtService.generateToken(theUserSession.getUser());

            // Actualizar la sesión
            theUserSession.setToken(token);
            theSessionRepository.save(theUserSession);

            return token;
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Código de verificación incorrecto");
            return null;
        }
    };
};
