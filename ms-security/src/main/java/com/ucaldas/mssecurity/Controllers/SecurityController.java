package com.ucaldas.mssecurity.Controllers;

import com.ucaldas.mssecurity.Models.User;
import com.ucaldas.mssecurity.Repositories.SessionRepository;
import com.ucaldas.mssecurity.Repositories.UserRepository;
import com.ucaldas.mssecurity.services.EmailService;
import com.ucaldas.mssecurity.services.EncryptionService;
import com.ucaldas.mssecurity.services.JwtService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/public/security")
public class SecurityController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EncryptionService encryptionService;

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private JwtService theJwtService;
    @Autowired
    private EmailService emailService;

    @PostMapping("login")
    public String login(@RequestBody User theUser, final HttpServletResponse response) throws IOException {
        String token = "";
        User actualUser = this.theUserRepository.getUserByEmail(theUser.getEmail());
        if (actualUser != null &&
                actualUser.getPassword().equals(this.theEncryptionService.convertSHA256(theUser.getPassword()))) {
            token = this.theJwtService.generateToken(actualUser);

            this.theEmailService.sendEmail(actualUser.getEmail(), "Inicio de Sesión",
                    "Ha iniciado sesión con éxito en nuestra aplicación.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }

    @PostMapping("permissions-validator")
    public boolean permissionsValidation(final HttpServletRequest request, @RequestBody Permission thePermission){
       boolean succes =this.theValidatorService.validationRolePermission(request, thePermission.getUrl(), thePermission.getMethod());
       return succes;
    }
}
